/* @noflow */
import { selectionAdorment, PortsList } from './components';
import type { Go } from './components/types';

type Params = {
  go: Go,
  thisHandle: Object,
  theme: Object,
  sanitized: ?Boolean,
};

export default function departmentTemplate({ go, thisHandle, theme }: Params) {
  const $$ = go.GraphObject.make;

  return $$(
    go.Node,
    'Auto',
    {
      selectable: true,
      selectionAdornmentTemplate: selectionAdorment({ go }),
      maxSize: new go.Size(theme.department.width, theme.department.height),
      minSize: new go.Size(theme.department.width, theme.department.height),
      locationSpot: go.Spot.Center,
      doubleClick: thisHandle.openDetailsModal,
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    { isTreeExpanded: true },
    new go.Binding('isTreeExpanded').makeTwoWay(),
    $$(
      go.Panel,
      'Auto',
      { name: 'Department' },
      $$(go.Shape, {
        geometryString:
          // eslint-disable-next-line max-len
          'F M7.000,1.000 L75.922,1.000 L80.310,9.000 L249.000,9.000 C251.209,9.000 253.000,10.791 253.000,13.000 L253.000,57.000 C253.000,59.209 251.209,61.000 249.000,61.000 L7.000,61.000 C4.791,61.000 3.000,59.209 3.000,57.000 L3.000,5.000 C3.000,2.791 4.791,1.000 7.000,1.000 Z',
        stroke: theme.department.background,
        fill: theme.department.background,
      }),
      $$(
        go.TextBlock,
        {
          stroke: theme.department.fontColor,
          font: `${theme.department.fontSize}pt ${theme.department.fontStyle}`,
        },
        new go.Binding('text', 'name').makeTwoWay()
      )
    ),
    ...PortsList(go),
    $$('TreeExpanderButton', {
      alignment: go.Spot.Bottom,
      alignmentFocus: go.Spot.Top,
      visible: true,
    })
  );
}
