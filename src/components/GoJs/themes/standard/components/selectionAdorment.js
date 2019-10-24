// @flow
import type { Go } from './types';

export default function selectionAdorment({ go }: { go: Go }): Object {
  const $$ = go.GraphObject.make;
  return $$(
    go.Adornment,
    'Auto',
    $$(go.Shape, {
      fill: null,
      stroke: 'deepskyblue',
      strokeWidth: 2,
      strokeDashArray: [4, 2],
    }),
    $$(go.Placeholder)
  );
}
