// @flow
import type { Go } from './types';

const PortsList = (go: Go) => {
  const $$ = go.GraphObject.make;

  const makePort = (name, spot, output, input) =>
    $$(go.Shape, 'Circle', {
      fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
      stroke: null,
      strokeWidth: 2,
      desiredSize: new go.Size(8, 8),
      alignment: spot, // align the port on the main Shape
      alignmentFocus: spot, // just inside the Shape
      portId: name, // declare this object to be a 'port'
      fromSpot: spot,
      toSpot: spot, // declare where links may connect at this port
      fromLinkable: output,
      toLinkable: input, // declare whether the user may draw links to/from here
      cursor: 'pointer', // show a different cursor to indicate potential link point
    });

  function showSmallPorts(node, show) {
    node.ports.each(port => {
      if (port.portId !== '') {
        // don't change the default port, which is the big shape
        port.fill = show ? 'rgba(0, 122, 255, 0.4)' : null; // '#007aff'
      }
    });
  }

  const portsList = [
    makePort('T', go.Spot.Top, false, true),
    makePort('L', go.Spot.Left, true, true),
    makePort('R', go.Spot.Right, true, true),
    makePort('B', go.Spot.Bottom, true, false),
    {
      // handle mouse enter/leave events to show/hide the ports
      // eslint-disable-next-line
      mouseEnter: (event: SyntheticMouseEvent<T>, node: Object) => {
        showSmallPorts(node, true);
      },
      // eslint-disable-next-line
      mouseLeave: (event: SyntheticMouseEvent<T>, node: Object) => {
        showSmallPorts(node, false);
      },
    },
  ];

  return portsList;
};

export default PortsList;
