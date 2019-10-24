// @flow
// icons for the 3rd row of people cards
import { selectionAdorment, PortsList } from './components';
import Settings from './settings';
import getEventDragAndDrop, { setControlLayer } from './dragAndDrop';

export default function makePersonNodeTemplate({ onDoubleClick, theme, sanitized }) {
  const go = require('gojs');
  const $$ = go.GraphObject.make;
  if (!theme) theme = Settings;
  if (!onDoubleClick) {
    onDoubleClick = () => {};
  }
  const { width } = theme.toDo;

  return $$(
    go.Node,
    'Spot',
    getEventDragAndDrop(),
    setControlLayer(),
    { locationSpot: go.Spot.Center },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    {
      visible: !sanitized,
      selectable: true,
      selectionAdornmentTemplate: selectionAdorment({ go }),
      resizable: false,
      resizeObjectName: 'PANEL',
      resizeAdornmentTemplate: null,
      isLayoutPositioned: false,
      selectionChanged: part => {
        if (part.isSelected) part.layerName = 'Foreground';
        else part.layerName = '';
      },
      doubleClick: onDoubleClick,
      linkConnected: node => {
        // node, link, port
        if (node.findLinksConnected().count !== 0) {
          node.isLayoutPositioned = true;
        }
      },
      linkDisconnected: node => {
        if (node.findLinksConnected().count === 0) {
          node.isLayoutPositioned = false;
        }
      },
    },
    // the main object is a Panel that surrounds a TextBlock with a Shape
    $$(
      go.Panel,
      'Auto',
      { name: 'PANEL' },
      $$(
        go.Shape,
        'Rectangle', // default figure
        {
          fill: 'white', // default color
          name: 'DRAG SHAPE',
          strokeWidth: 1, // default strokeWidth
          width,
          height: theme.toDo.height,
        },
        new go.Binding('figure'),
        new go.Binding('stroke'),
        new go.Binding('strokeCap'),
        new go.Binding('strokeWidth').makeTwoWay(),
        new go.Binding('fill')
      ),
      $$(
        go.Panel,
        'Table',
        {
          fromLinkable: false,
          toLinkable: false,
          margin: new go.Margin(10, 10, 10, 10),
        },
        $$(
          go.TextBlock, // Label
          {
            row: 0,
            font: `bold ${theme.toDo.name.fontSize}pt ${theme.toDo.name.fontType}, Arial, sans-serif`,
            stroke: theme.toDo.name.fontColor,
            maxSize: new go.Size(width, theme.toDo.name.fontSize * 4),
            textAlign: 'center',
            width,
            margin: 2,
            wrap: go.TextBlock.WrapFit,
            editable: false,
            isMultiline: true,
            minSize: new go.Size(width, 15),
          },
          new go.Binding('text', 'name').makeTwoWay(),
          new go.Binding('stroke', 'textColor').makeTwoWay()
        ),
        $$(
          go.TextBlock, // Sublabel
          {
            row: 1,
            textAlign: 'center',
            width,
            font: `${theme.toDo.title.fontSize - 2}pt ${
              theme.toDo.title.fontType
            }, Arial, sans-serif`,
            stroke: theme.toDo.title.fontColor,
            maxSize: new go.Size(width, theme.toDo.title.fontSize * 4),
            isMultiline: true,
            margin: 2,
            wrap: go.TextBlock.WrapFit,
            editable: false,
            minSize: new go.Size(width, 25),
          },
          new go.Binding('text', 'title').makeTwoWay(),
          new go.Binding('stroke', 'textColor').makeTwoWay()
        )
      )
    ),
    // four small named ports, one on each side:
    ...PortsList(go)
  );
}
