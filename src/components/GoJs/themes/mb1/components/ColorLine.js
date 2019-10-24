// @flow
import type { Go } from 'utils/types';
import { attitudeOptions } from 'utils/types';

function getColorForAttitude(person) {
  const { attitudeTowardsDeal } = person;
  const attidudeData = attitudeOptions.find(item => item.id === attitudeTowardsDeal);
  const color = (attidudeData && attidudeData.color) || person.fill || null; // default value
  return color;
}

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
    new go.Binding('fill', '', getColorForAttitude),
    new go.Binding('stroke', '', getColorForAttitude)
  );

export default ColorLine;
