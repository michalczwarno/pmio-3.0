// @flow
/* eslint-disable no-restricted-globals */

// conditional import
const go = window ? require('gojs') : null;

// For the layout

// These parameters need to be set before defining the templates.
const MINLENGTH = 200; // this controls the minimum length of any swimlane
const MINBREADTH = 20; // this controls the minimum breadth of any non-collapsed swimlane

// some shared functions

// this may be called to force the lanes to be laid out again
/*
function relayoutLanes(myDiagram) {
  myDiagram.nodes.each((lane) => {
    if (!(lane instanceof go.Group)) return;
    if (lane.category === 'Pool') return;
    lane.layout.isValidLayout = false; // force it to be invalid
  });
  myDiagram.layoutDiagram();
}
*/

// this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again
function relayoutDiagram(myDiagram) {
  myDiagram.layout.invalidateLayout();
  myDiagram.findTopLevelGroups().each(g => {
    if (g.category === 'Pool') g.layout.invalidateLayout();
  });
  myDiagram.layoutDiagram();
}

// compute the minimum size of a Pool Group needed to hold all of the Lane Groups
function computeMinPoolSize(pool) {
  // assert(pool instanceof go.Group && pool.category === "Pool");
  let len = MINLENGTH;
  pool.memberParts.each(lane => {
    // pools ought to only contain lanes, not plain Nodes
    if (!(lane instanceof go.Group)) return;
    const holder = lane.placeholder;
    if (holder !== null) {
      const sz = holder.actualBounds;
      len = Math.max(len, sz.height);
    }
  });
  return new go.Size(NaN, len);
}

// determine the minimum size of a Lane Group, even if collapsed
function computeMinLaneSize(lane) {
  if (!lane.isSubGraphExpanded) return new go.Size(1, MINLENGTH);
  return new go.Size(MINBREADTH, MINLENGTH);
}

// compute the minimum size for a particular Lane Group
function computeLaneSize(lane) {
  // assert(lane instanceof go.Group && lane.category !== "Pool");
  const sz = computeMinLaneSize(lane);
  if (lane.isSubGraphExpanded) {
    const holder = lane.placeholder;
    if (holder !== null) {
      const hsz = holder.actualBounds;
      sz.width = Math.max(sz.width, hsz.width);
    }
  }
  // minimum breadth needs to be big enough to hold the header
  const hdr = lane.findObject('HEADER');
  if (hdr !== null) sz.width = Math.max(sz.width, hdr.actualBounds.width);
  return sz;
}

// define a custom ResizingTool to limit how far one can shrink a lane Group
function LaneResizingTool() {
  go.ResizingTool.call(this);
}
go.Diagram.inherit(LaneResizingTool, go.ResizingTool);

LaneResizingTool.prototype.isLengthening = () => this.handle.alignment === go.Spot.Bottom;

/** @override */
LaneResizingTool.prototype.computeMinPoolSize = () => {
  const lane = this.adornedObject.part;
  // assert(lane instanceof go.Group && lane.category !== "Pool");
  const msz = computeMinLaneSize(lane); // get the absolute minimum size
  if (this.isLengthening()) {
    // compute the minimum length of all lanes
    const sz = computeMinPoolSize(lane.containingGroup);
    msz.height = Math.max(msz.height, sz.height);
  } else {
    // find the minimum size of this single lane
    const sz = computeLaneSize(lane);
    msz.width = Math.max(msz.width, sz.width);
    msz.height = Math.max(msz.height, sz.height);
  }
  return msz;
};

/** @override */
LaneResizingTool.prototype.resize = newr => {
  const currentLane = this.adornedObject.part;
  if (this.isLengthening()) {
    // changing the length of all of the lanes
    currentLane.containingGroup.memberParts.each(lane => {
      if (!(lane instanceof go.Group)) return;
      const shape = lane.resizeObject;
      if (shape !== null) {
        // set its desiredSize length, but leave each breadth alone
        shape.height = newr.height;
      }
    });
  } else {
    // changing the breadth of a single lane
    go.ResizingTool.prototype.resize.call(this, newr);
  }
  relayoutDiagram(this.diagram); // now that the lane has changed size, layout the pool again
};
// end LaneResizingTool class

// define a custom grid layout that makes sure the length of each lane is the same
// and that each lane is broad enough to hold its subgraph
export default function PoolLayout() {
  go.GridLayout.call(this);
  this.cellSize = new go.Size(1, 1);
  this.wrappingColumn = Infinity;
  this.wrappingWidth = Infinity;
  this.isRealtime = false; // don't continuously layout while dragging
  this.alignment = go.GridLayout.Position;
  // This sorts based on the location of each Group.
  // This is useful when Groups can be moved up and down in order to change their order.
  this.comparer = (a, b) => {
    const ax = a.location.x;
    const bx = b.location.x;
    if (isNaN(ax) || isNaN(bx)) return 0;
    if (ax < bx) return -1;
    if (ax > bx) return 1;
    return 0;
  };
}
go.Diagram.inherit(PoolLayout, go.GridLayout);

/** @override */
PoolLayout.prototype.doLayout = coll => {
  const { diagram } = this;
  if (diagram === null) return;
  diagram.startTransaction('PoolLayout');
  const pool = this.group;
  if (pool !== null && pool.category === 'Pool') {
    // make sure all of the Group Shapes are big enough
    const minsize = computeMinPoolSize(pool);
    pool.memberParts.each(lane => {
      if (!(lane instanceof go.Group)) return;
      if (lane.category !== 'Pool') {
        const shape = lane.resizeObject;
        if (shape !== null) {
          // change the desiredSize to be big enough in both directions
          const sz = computeLaneSize(lane);
          shape.width = !isNaN(shape.width) ? Math.max(shape.width, sz.width) : sz.width;
          shape.height = isNaN(shape.height)
            ? minsize.height
            : Math.max(shape.height, minsize.height);
          const cell = lane.resizeCellSize;
          if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0)
            shape.width = Math.ceil(shape.width / cell.width) * cell.width;
          if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0)
            shape.height = Math.ceil(shape.height / cell.height) * cell.height;
        }
      }
    });
  }
  // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
  go.GridLayout.prototype.doLayout.call(this, coll);
  diagram.commitTransaction('PoolLayout');
};
// end PoolLayout class
