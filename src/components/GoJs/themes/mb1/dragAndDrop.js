import go from 'gojs';

function mayWorkFor(node1, node2) {
  if (!(node1 instanceof go.Node)) return false; // must be a Node
  if (node1 === node2) return false; // cannot work for yourself
  if (node2.isInTreeOf && node2.isInTreeOf(node1)) return false; // cannot work for someone who works for you
  return true;
}

const mapPosition = {
  xLess: {
    yLess: { parent: 'L', child: 'B' },
    yEqual: { parent: 'L', child: 'R' },
    yMore: { parent: 'L', child: 'T' },
  },

  xEqual: {
    yLess: { parent: 'T', child: 'B' },
    yEqual: { parent: 'L', child: 'R' },
    yMore: { parent: 'B', child: 'T' },
  },

  xMore: {
    yLess: { parent: 'R', child: 'B' },
    yEqual: { parent: 'R', child: 'L' },
    yMore: { parent: 'R', child: 'T' },
  },
};

function getPositionX(parentX, childX) {
  const delta = parentX - childX;
  if (delta > -100 && delta < 100) return 'xEqual';
  if (delta > 0) return 'xLess';
  if (delta < 0) return 'xMore';
}

function getPositionY(parentY, childY) {
  const delta = parentY - childY;
  if (delta > -100 && delta < 100) return 'yEqual';
  if (delta > 0) return 'yLess';
  if (delta < 0) return 'yMore';
}

function getPort(parentNode, childNode) {
  const yMapPosition = mapPosition[getPositionX(parentNode.location.x, childNode.oldLocation.x)];
  return yMapPosition[getPositionY(parentNode.location.y, childNode.oldLocation.y)];
}

export default function getEventDragAndDrop() {
  return {
    mouseOver: (InputEvent, part) => {
      part.oldLocation = part.location;
    },

    mouseDragEnter: (event, node) => {
      const shape = node.findObject('DRAG SHAPE');
      if (shape) {
        shape._prevFill = shape.fill;
        shape.fill = 'darkred';
      }
    },

    mouseDragLeave: (event, node) => {
      const shape = node.findObject('DRAG SHAPE');
      if (shape && shape._prevFill) {
        shape.fill = shape._prevFill;
      }
    },

    mouseDrop: (event, node) => {
      const selectedNode = node.diagram.selection.first();

      if (mayWorkFor(selectedNode, node)) {
        const link = selectedNode.findTreeParentLink();
        if (link !== null) {
          selectedNode.location = selectedNode.oldLocation;
          link.fromNode = node;
          return;
        }

        const port = getPort(node, selectedNode);
        node.diagram.model.addLinkData({
          from: node.key,
          fromPortId: port.parent,
          to: selectedNode.key,
          toPortId: port.child,
        });
        selectedNode.location = selectedNode.oldLocation;
      }
    },
  };
}

export function setControlLayer() {
  return new go.Binding('layerName', 'isSelected', sel => (sel ? 'Foreground' : '')).ofObject();
}
