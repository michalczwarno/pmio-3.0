// @flow
/* eslint-disable no-restricted-globals */
// conditional import
const go = window ? require('gojs') : null;
// For the layout
const MINLENGTH = 200; // this controls the minimum length of any swimlane
const MINBREADTH = 100; // this controls the minimum breadth of any non-collapsed swimlane

// compute the minimum size of the whole diagram needed to hold all of the Lane Groups
function computeMinPoolSize(diagram) {
  let len = MINLENGTH;
  diagram.findTopLevelGroups().each(lane => {
    const holder = lane.placeholder;
    if (holder !== null) {
      const sz = holder.actualBounds;
      len = Math.max(len, sz.height);
    }
    const box = lane.selectionObject;
    // naturalBounds instead of actualBounds to disregard the shape's stroke width
    len = Math.max(len, box.naturalBounds.height);
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
  // assert(lane instanceof go.Group);
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

// define a custom grid layout that makes sure the length of each lane is the same
// and that each lane is broad enough to hold its subgraph
export default function PoolLayout() {
  go.GridLayout.call(this);
  this.cellSize = new go.Size(1, 1);
  this.wrappingColumn = Infinity;
  this.wrappingWidth = Infinity;
  this.spacing = new go.Size(0, 0);
  this.alignment = go.GridLayout.Position;
}
go.Diagram.inherit(PoolLayout, go.GridLayout);

/** @override */
PoolLayout.prototype.doLayout = function doLayout(coll) {
  const { diagram } = this;
  if (diagram === null) return;
  diagram.startTransaction('PoolLayout');
  // make sure all of the Group Shapes are big enough
  const minsize = computeMinPoolSize(diagram);
  diagram.findTopLevelGroups().each(lane => {
    if (!(lane instanceof go.Group)) return;
    const shape = lane.selectionObject;
    if (shape !== null) {
      // change the desiredSize to be big enough in both directions
      const sz = computeLaneSize(lane);
      shape.width = !isNaN(shape.width) ? Math.max(shape.width, sz.width) : sz.width;
      shape.height = isNaN(shape.height) ? minsize.height : Math.max(shape.height, minsize.height);
      const cell = lane.resizeCellSize;
      if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0)
        shape.width = Math.ceil(shape.width / cell.width) * cell.width;
      if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0)
        shape.height = Math.ceil(shape.height / cell.height) * cell.height;
    }
  });
  // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
  go.GridLayout.prototype.doLayout.call(this, coll);
  diagram.commitTransaction('PoolLayout');
};
// end PoolLayout class
