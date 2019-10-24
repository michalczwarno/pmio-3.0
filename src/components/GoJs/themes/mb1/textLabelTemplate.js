/* @noflow */
import { selectionAdorment, resizeAdornment } from './components';
import getEventDragAndDrop, { setControlLayer } from './dragAndDrop';

type Params = {
  onDoubleClick?: () => void,
  thisHandle: Object,
  theme: ?Object,
  sanitized: ?Boolean,
};

export default function textLabelTemplate({ onDoubleClick, theme }: Params) {
  const go = require('gojs');
  const $$ = go.GraphObject.make;

  if (onDoubleClick === 'undefined') {
    onDoubleClick = () => {};
  }

  return $$(
    go.Node,
    'Auto',
    getEventDragAndDrop(),
    setControlLayer(),
    {
      selectable: true,
      selectionAdornmentTemplate: selectionAdorment({ go }),
      resizable: true,
      resizeObjectName: 'TextLabel',
      resizeAdornmentTemplate: resizeAdornment({ go }),
      doubleClick: onDoubleClick,
      minSize: new go.Size(theme.textLabel.width, theme.textLabel.height),
      locationSpot: go.Spot.Center,
      fromLinkable: false,
      toLinkable: false,
      defaultStretch: go.GraphObject.Fill,
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $$(go.Shape, 'Rectangle', {
      fill: theme.textLabel.background,
      stroke: theme.textLabel.background,
      name: 'DRAG SHAPE',
    }),
    $$(
      go.TextBlock,
      {
        editable: true,
        isMultiline: true,
        font: `${theme.textLabel.fontSize}pt ${theme.textLabel.fontStyle}`,
        stroke: theme.textLabel.fontColor,
        background: theme.textLabel.background,
        margin: 5,
        textAlign: 'left',
        stretch: go.GraphObject.Fill,
      },
      new go.Binding('width', 'width').makeTwoWay(),
      new go.Binding('height', 'height').makeTwoWay(),
      new go.Binding('text', 'name').makeTwoWay()
    )
  );
}
