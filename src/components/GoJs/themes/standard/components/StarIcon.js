// @flow
import type { Go } from './types';

const StarIcon = ({ go, theme }: { go: Go, theme: Object }) => {
  const $$ = go.GraphObject.make;

  const IconCircle1 = $$(
    go.Shape,
    'Circle',
    {
      height: theme.card.picture.iconSize - 2,
      width: theme.card.picture.iconSize - 2,
      stroke: null,
      strokeWidth: 4,
      fill: null,
    },
    new go.Binding('stroke', 'target', target => {
      if (!target) return null;
      return theme.card.targetColor;
    }),
    new go.Binding('fill', 'target', target => {
      if (!target) return null;
      return theme.card.targetColor;
    })
  );

  const IconCircle2 = $$(
    go.Shape,
    'Circle',
    {
      height: theme.card.picture.iconSize - 6,
      width: theme.card.picture.iconSize - 6,
      stroke: null,
      strokeWidth: 2.5,
      fill: null,
    },
    new go.Binding('stroke', 'target', target => {
      if (!target) return null;
      return theme.card.background;
    }),
    new go.Binding('fill', 'target', target => {
      if (!target) return null;
      return theme.card.targetColor;
    })
  );

  const Icon = $$(go.Panel, 'Spot', IconCircle1, IconCircle2);

  return Icon;
};

export default StarIcon;
