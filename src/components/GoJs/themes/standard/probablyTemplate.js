import { Colors } from 'utils/Colors';
import linkContextMenu from './linkContextMenu';

export default function probablyTemplate({ go, $$, thisHandle }) {
  thisHandle.linkContextMenu = linkContextMenu.bind(thisHandle);
  return $$(
    go.Link,
    go.Link.Bezier,
    { isLayoutPositioned: false, isTreeLink: true },
    { relinkableFrom: true, relinkableTo: true },
    { reshapable: true, resegmentable: true },
    { layerName: 'links' },
    {
      routing: go.Link.Orthogonal,
      curve: go.Link.None,
      corner: 3,
      fromShortLength: 4,
    },
    {
      contextMenu: thisHandle.linkContextMenu(go, $$),
      doubleClick: (event, object) => {
        if (thisHandle.props.user && object.isSelected) {
          event.diagram.clearSelection();
          event.diagram.commandHandler.showContextMenu(object);
        }
      },
    },
    new go.Binding('points').makeTwoWay(),
    new go.Binding('toPortId', 'toPortId', toPortId => toPortId[0]).makeTwoWay(),
    new go.Binding('fromPortId', 'fromPortId', fromPortId => fromPortId[0]).makeTwoWay(),
    new go.Binding('fromSpot').makeTwoWay(),
    new go.Binding('toSpot').makeTwoWay(),
    $$(go.Shape, { stroke: Colors.probablyReportsTo(), strokeWidth: 2 }),
    $$(go.Shape, {
      fromArrow: 'BackwardOpenTriangle',
      stroke: Colors.probablyReportsTo(),
      strokeWidth: 2,
    })
  );
}
