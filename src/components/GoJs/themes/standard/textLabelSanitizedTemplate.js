import settings from './settings';

export default function textLabelTemplate({ go, $$ }) {
  return $$(
    go.Node,
    'Auto',
    {
      selectable: false,
      resizeObjectName: 'TextLabel',
      minSize: new go.Size(settings.textLabel.width, settings.textLabel.height),
      locationSpot: go.Spot.Center,
      defaultStretch: go.GraphObject.Fill,
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $$(go.Shape, 'Rectangle', {
      fill: settings.textLabel.background,
      stroke: settings.textLabel.background,
      portId: '', // the default port: if no spot on link data, use closest side
      fromLinkable: true,
      toLinkable: true,
    }),
    $$(
      go.TextBlock,
      {
        editable: true,
        isMultiline: true,
        font: `${settings.textLabel.fontSize}pt ${settings.textLabel.fontStyle}`,
        stroke: settings.textLabel.fontColor,
        background: settings.textLabel.background,
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
