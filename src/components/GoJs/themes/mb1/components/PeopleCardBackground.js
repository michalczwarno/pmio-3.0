// @flow
import type { Go } from 'utils/types';
import { influenceOptions } from 'utils/types';
import Settings from '../settings';
import { hideIfSanitized } from '../../sanitized';

type Params = {
  go: Go,
  theme: ?Object,
  sanitized: ?Boolean,
};

function getColorForRole(role) {
  const influenceData = influenceOptions.find(item => item.id === role);
  const color = (influenceData && influenceData.color) || Settings.card.background; // default value
  return color;
}

const PeopleCardBackground = ({ go, theme = Settings, sanitized }: Params) =>
  go &&
  go.GraphObject.make(
    go.Shape,
    'RoundedRectangle', // backgdround default figure
    {
      fill: theme.card.background, // default color
      name: 'DRAG SHAPE',
      stroke: theme.card.border,
      strokeWidth: 1, // default strokeWidth
      width: theme.card.width,
      height: theme.card.height,
      figure: 'RoundedRectangle',
    },
    hideIfSanitized(new go.Binding('fill', 'role', getColorForRole), sanitized)
  );

export default PeopleCardBackground;
