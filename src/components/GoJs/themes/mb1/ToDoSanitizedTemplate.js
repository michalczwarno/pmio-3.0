// icons for the 3rd row of people cards
import { PortsList } from './components';
import settings from './settings';

export default function ToDoSanitizedTemplate({ go, $$ }) {
  return $$(
    go.Node,
    'Spot',
    { locationSpot: go.Spot.Center },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    {
      selectable: false,
      resizable: false,
    },
    { fromLinkableDuplicates: false, toLinkableDuplicates: false },
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
          portId: '', // the default port: if no spot on link data, use closest side
          fromLinkable: true,
          toLinkable: true,
          strokeWidth: 1, // default strokeWidth
          width: settings.toDo.width,
          height: settings.toDo.height,
        },
        new go.Binding('figure'),
        new go.Binding('stroke'),
        new go.Binding('strokeCap'),
        new go.Binding('strokeWidth').makeTwoWay()
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
            font: `bold ${settings.toDo.name.fontSize}pt ${
              settings.toDo.name.fontType
            }, Arial, sans-serif`,
            stroke: settings.toDo.name.fontColor,
            maxSize: new go.Size(settings.toDo.width, settings.toDo.name.fontSize * 4),
            textAlign: 'center',
            width: settings.toDo.width,
            margin: 2,
            wrap: go.TextBlock.WrapFit,
            editable: false,
            isMultiline: true,
            minSize: new go.Size(settings.toDo.width, 15),
          },
          new go.Binding('text', 'name').makeTwoWay(),
          new go.Binding('stroke', 'textColor').makeTwoWay()
        ),
        $$(
          go.TextBlock, // Sublabel
          {
            row: 1,
            textAlign: 'center',
            width: settings.toDo.width,
            font: `${settings.toDo.title.fontSize - 2}pt ${
              settings.toDo.title.fontType
            }, Arial, sans-serif`,
            stroke: settings.toDo.title.fontColor,
            maxSize: new go.Size(settings.toDo.width, settings.toDo.title.fontSize * 4),
            isMultiline: true,
            margin: 2,
            wrap: go.TextBlock.WrapFit,
            editable: false,
            minSize: new go.Size(settings.toDo.width, 25),
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
