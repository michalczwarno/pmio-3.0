// @flow
import type { Go } from './types';
import Settings from '../settings';

const PeopleCardBackground = (go: Go, theme = Settings) =>
  go &&
  go.GraphObject.make(
    go.Shape,
    'RoundedRectangle', // backgdround default figure
    {
      fill: theme.card.background, // default color
      stroke: theme.card.border,
      strokeWidth: 1, // default strokeWidth
      width: theme.card.width,
      height: theme.card.height,
      figure: 'RoundedRectangle',
      // spot1: new go.Spot(0, 0, 3, 1), // top-left Spot used by some Panels for determining where in the shape other objects may be placed
      // spot2: new go.Spot(1, 1, 3, 1), // bottom-right  Spot used by some Panels for determining where in the shape other objects may be placed
    },
    new go.Binding('fill', 'powerPlayer', powerPlayer =>
      powerPlayer ? theme.card.powerPlayerColor : theme.card.background
    )
  );

export default PeopleCardBackground;
