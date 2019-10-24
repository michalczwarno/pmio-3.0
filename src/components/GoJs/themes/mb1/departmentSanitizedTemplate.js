import settings from './settings';
import { PortsList } from './components';

export default function departmentSanitizedTemplate({ go, $$ }) {
  return $$(
    go.Node,
    'Auto',
    {
      selectable: false,
      maxSize: new go.Size(settings.department.width, settings.department.height),
      minSize: new go.Size(settings.department.width, settings.department.height),
      locationSpot: go.Spot.Center,
    },
    { fromLinkableDuplicates: false, toLinkableDuplicates: false },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $$(
      go.Panel,
      'Auto',
      { name: 'Department' },
      $$(go.Shape, {
        portId: '', // the default port: if no spot on link data, use closest side
        fromLinkable: true,
        toLinkable: true,
        geometryString:
          // eslint-disable-next-line max-len
          'F M7.000,1.000 L75.922,1.000 L80.310,9.000 L249.000,9.000 C251.209,9.000 253.000,10.791 253.000,13.000 L253.000,57.000 C253.000,59.209 251.209,61.000 249.000,61.000 L7.000,61.000 C4.791,61.000 3.000,59.209 3.000,57.000 L3.000,5.000 C3.000,2.791 4.791,1.000 7.000,1.000 Z',
        stroke: settings.department.background,
        fill: settings.department.background,
      }),
      $$(
        go.TextBlock,
        {
          stroke: settings.department.fontColor,
          font: `${settings.department.fontSize}pt ${settings.department.fontStyle}`,
        },
        new go.Binding('text', 'name').makeTwoWay()
      )
    ),
    ...PortsList(go)
  );
}
