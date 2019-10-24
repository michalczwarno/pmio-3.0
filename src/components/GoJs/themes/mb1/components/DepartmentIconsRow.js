// @flow
import { noteIcon } from 'components/Icons';
import type { Go } from './types';
import Settings from '../settings';
import { makeIconSquare } from './index.js';

type Params = {
  go: Go,
  theme?: Object,
};

export default function IconsRow({ go, theme = Settings }: Params) {
  const $$ = go.GraphObject.make;

  return $$(
    go.Panel,
    'Vertical',
    {
      defaultAlignment: go.Spot.Right,
      desiredSize: new go.Size(theme.department.width, theme.card.icon.height),
    },
    makeIconSquare({
      go,
      icon: department => (department.notes && department.notes !== '' ? noteIcon : null),
      tooltipFunc: department =>
        department.notes && department.notes !== '' ? department.notes : null,
    })
  );
}
