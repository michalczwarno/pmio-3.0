// @flow
/* eslint-disable no-restricted-globals */
const MINLENGTH = 200; // this controls the minimum length of any swimlane
const MINBREADTH = 100; // this controls the minimum breadth of any non-collapsed swimlane

// conditional import
const go = window ? require('gojs') : null;

export default class PoolLayout extends go.GridLayout {
  constructor(diagram) {
    super();
    this.cellSize = new go.Size(1, 1);
    this.wrappingColumn = Infinity;
    this.wrappingWidth = Infinity;
    this.spacing = new go.Size(0, 0);
    this.alignment = go.GridLayout.Position;
    this.diagram = diagram;
  }

  // determine the minimum size of a Lane Group, even if collapsed
  computeMinLaneSize = lane => {
    if (!lane.isSubGraphExpanded) return new go.Size(1, MINLENGTH);
    return new go.Size(MINBREADTH, MINLENGTH);
  };

  // compute the minimum size for a particular Lane Group
  computeLaneSize = lane => {
    // assert(lane instanceof go.Group);
    const sz = this.computeMinLaneSize(lane);
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
  };

  // compute the minimum size of the whole diagram needed to hold all of the Lane Groups
  computeMinPoolSize = () => {
    let len = MINLENGTH;
    this.diagram.findTopLevelGroups().each(lane => {
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
  };

  doLayout = coll => {
    const { diagram } = this;
    if (diagram === null) return;
    diagram.startTransaction('PoolLayout');
    // make sure all of the Group Shapes are big enough
    const minsize = this.computeMinPoolSize();
    diagram.findTopLevelGroups().each(lane => {
      if (!(lane instanceof go.Group)) return;
      const shape = lane.selectionObject;
      if (shape !== null) {
        // change the desiredSize to be big enough in both directions
        const sz = this.computeLaneSize(lane);
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
    });
    // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
    go.GridLayout.prototype.doLayout.call(this, coll);
    diagram.commitTransaction('PoolLayout');
  };
}

go.Diagram.inherit(PoolLayout, go.GridLayout);
