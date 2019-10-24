// @flow
import type { Go, Margin } from './types';
import Settings from '../settings';

type Params = {
  go: Go,
  theme?: Object,
  icon: (a: *) => *,
  margin: ?Margin | any,
  click?: ?(event: SyntheticMouseEvent<T>, object: any) => *,
  tooltipFunc?: ?(a: *) => * | string | void,
};

export default function makeIconSquare({
  go,
  theme = Settings,
  icon,
  margin,
  click,
  tooltipFunc,
}: Params) {
  const $$ = go.GraphObject.make;
  const marginObject =
    margin || new go.Margin(0, theme.card.icon.margin, 0, theme.card.icon.margin);

  const pictureProperties = {
    width: theme.card.icon.width,
    height: theme.card.icon.height,
    imageStretch: go.GraphObject.Uniform,
    desiredSize: new go.Size(theme.card.icon.width, theme.card.icon.height),
    margin: marginObject,
    name: 'icon',
  };

  const IconSquare = $$(go.Picture, pictureProperties, new go.Binding('source', '', icon));

  if (click) {
    IconSquare.click = click;
    IconSquare.doubleClick = click;
  }

  if (tooltipFunc) {
    IconSquare.toolTip = $$(
      go.Adornment,
      'Auto',
      $$(go.Shape, { fill: theme.card.note.color }),
      $$(go.TextBlock, { margin: 5 }, new go.Binding('text', '', tooltipFunc))
    );
  }

  return IconSquare;
}
