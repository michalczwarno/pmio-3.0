// @flow
import type { Go } from './types';

type Params = { go: Go };

export default function resizeAdornment({ go }: Params) /* : void */ {
  const $$ = go.GraphObject.make;
  return $$(
    go.Adornment,
    'Spot',
    { locationSpot: go.Spot.Right },
    $$(go.Placeholder),
    $$(go.Shape, {
      alignment: go.Spot.TopLeft,
      cursor: 'nw-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.Top,
      cursor: 'n-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.TopRight,
      cursor: 'ne-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.Left,
      cursor: 'w-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.Right,
      cursor: 'e-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.BottomLeft,
      cursor: 'se-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.Bottom,
      cursor: 's-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.BottomRight,
      cursor: 'sw-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    })
  );
}
