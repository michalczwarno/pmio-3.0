// @flow
import type { Go } from './types';

const ColorLine = ({ go, theme }: { go: Go, theme: Object }) =>
  go &&
  go.GraphObject.make(
    go.Shape,
    'RoundedRectangle',
    {
      height: theme.colorLine.height,
      minSize: new go.Size(theme.card.width, NaN),
      alignment: go.Spot.TopCenter,
      fill: null, // defaults
      stroke: null, // defaults
      strokeWidth: 0,
      margin: 0,
    },
    new go.Binding('stroke', 'fill'),
    new go.Binding('fill')
  );

export default ColorLine;
