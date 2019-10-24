import Settings from './settings';
import linkContextMenu from './linkContextMenu';

export default function linkTemplate({ go, thisHandle }) {
  const $$ = go.GraphObject.make;

  thisHandle.linkContextMenu = linkContextMenu.bind(thisHandle);

  const linkSelectionAdornmentTemplate = $$(
    go.Adornment,
    'Link',
    $$(
      go.Shape,
      // isPanelMain declares that this Shape shares the Link.geometry
      { isPanelMain: true, fill: null, stroke: 'deepskyblue', strokeWidth: 0 } // use selection object's strokeWidth
    )
  );

  return $$(
    go.Link, // the whole link panel
    { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
    { reshapable: true, resegmentable: true },
    { isTreeLink: true },
    { layerName: 'links' },
    {
      routing: go.Link.Orthogonal,
      corner: 1,
      fromShortLength: 4, // Gets or sets how far the end segment stops short of the actual port.
    },
    { relinkableFrom: true, relinkableTo: true },
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
    $$(
      go.Shape, // the link path shape
      { isPanelMain: true, strokeWidth: Settings.link.width },
      { stroke: Settings.link.color },
      new go.Binding('stroke')
    ),
    $$(
      go.Shape, // the arrowhead
      { fromArrow: 'Backward', stroke: Settings.link.color, fill: Settings.link.color }
    ),
    $$(go.Panel, 'Auto', new go.Binding('visible', 'isSelected').ofObject())
  );
}
