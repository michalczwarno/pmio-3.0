/* @noflow */
// icons for the 3rd row of people cards

import type { Go } from './components/types';
import getEventDragAndDrop, { setControlLayer } from './dragAndDrop';

type Params = {
  go: Go,
  thisHandle: Object,
  theme: ?Object,
};

export default function commentTemplate({ go }: Params) {
  const $$ = go.GraphObject.make;

  return $$(
    go.Node, // this needs to act as a rectangular shape for BalloonLink,
    { locationSpot: go.Spot.Center },
    { resizable: false },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $$(
      go.Panel,
      'Auto',
      { name: 'PANEL' },
      { background: 'transparent' },
      getEventDragAndDrop(),
      setControlLayer(),
      $$(go.Shape, 'Rectangle', new go.Binding('figure')),
      $$(
        go.Panel,
        'Table',
        $$(
          go.TextBlock, // Name
          {
            row: 0,
            font: '10pt Helvetica, Arial, sans-serif',
            textAlign: 'center',
            // margin: new go.Margin(2, 10, 2, 10),
            editable: true,
          },
          { isMultiline: true, wrap: go.TextBlock.WrapFit },
          new go.Binding('text').makeTwoWay(),
          { desiredSize: new go.Size(100, 24) }
        )
      )
    )
  );
}
