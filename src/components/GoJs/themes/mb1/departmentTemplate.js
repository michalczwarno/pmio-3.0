/* @noflow */
import { selectionAdorment, PortsList, DepartmentIconsRow } from './components';
import type { Go } from './components/types';
import getEventDragAndDrop, { setControlLayer } from './dragAndDrop';
import { hideIfSanitized } from '../sanitized';

type Params = {
  go: Go,
  thisHandle: Object,
  theme: Object,
  sanitized: ?Boolean,
};

const ALIGNMENT_ICONS_ROW_X = 0.5;
const ALIGNMENT_ICONS_ROW_Y = 0.9;

export default function departmentTemplate({ go, thisHandle, theme, sanitized }: Params) {
  const $$ = go.GraphObject.make;

  return $$(
    go.Node,
    'Auto',
    getEventDragAndDrop(),
    setControlLayer(),

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
      $$(
        go.Shape,
        {
          geometryString:
            // eslint-disable-next-line max-len
            'F M7.000,1.000 L75.922,1.000 L80.310,9.000 L249.000,9.000 C251.209,9.000 253.000,10.791 253.000,13.000 L253.000,57.000 C253.000,59.209 251.209,61.000 249.000,61.000 L7.000,61.000 C4.791,61.000 3.000,59.209 3.000,57.000 L3.000,5.000 C3.000,2.791 4.791,1.000 7.000,1.000 Z',
          stroke: theme.department.background,
          fill: theme.department.background,
          name: 'DRAG SHAPE',
        },
        new go.Binding('fill', 'color').makeTwoWay(),
        new go.Binding('stroke', 'color').makeTwoWay()
      ),
      $$(
        go.TextBlock,
        {
          stroke: theme.department.fontColor,
          font: `${theme.department.fontSize}pt ${theme.department.fontStyle}`,
        },
        new go.Binding('text', 'name').makeTwoWay()
      ),
      $$(
        go.Panel,
        'Horizontal',
        { alignment: new go.Spot(ALIGNMENT_ICONS_ROW_X, ALIGNMENT_ICONS_ROW_Y) },
        hideIfSanitized(DepartmentIconsRow({ go }), sanitized)
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
