// @flow
import { ProfilePicture, iconsDefinitions } from './index';

import type { Go } from './types';

const getGeometry = (go, geometryName: ?string) => {
  const geometry = typeof geometryName === 'string' ? iconsDefinitions[geometryName] : 'heart';
  return go.Geometry.parse(geometry, true);
};

const ProfilePictureWithAdornments = ({ go, theme }: { go: Go, theme: Object }) =>
  go &&
  go.GraphObject.make(
    go.Panel,
    'Spot',
    ProfilePicture({ go, theme }),

    // target circle
    /*
  go.GraphObject.make(go.Shape, 'Circle',
    {
      width: theme.card.picture.iconSize,
      height: theme.card.picture.iconSize,
      alignment: new go.Spot(0.1, 0.9),
      fill: null,
      stroke: null,
      strokeWidth: 2,
    },
    new go.Binding('fill', 'target', (target) => (target ? theme.card.picture.targetColor : null)),
    new go.Binding('stroke', 'target', (target) => (target ? 'white' : null)),
  ),
  */
    // met -- background circle
    go.GraphObject.make(
      go.Shape,
      'Circle',
      {
        width: theme.card.picture.iconSize,
        height: theme.card.picture.iconSize,
        alignment: new go.Spot(0.9, 0.9),
        strokeWidth: 2,
        fill: null,
        stroke: null,
      },
      new go.Binding('fill', 'met', met => {
        if (!met || met === '' || met === 'never') return null;
        return theme.orgChart.background; // 'white'
      })
    ),
    // met -- checkmark icon
    go.GraphObject.make(
      go.Shape,
      {
        geometry: getGeometry(go, 'checked'),
        alignment: new go.Spot(0.9, 0.9),
        height: theme.card.picture.iconSize - 4,
        width: theme.card.picture.iconSize - 4,
        stroke: null,
        fill: null,
      },
      new go.Binding('stroke', 'met', met => {
        if (!met || met === '' || met === 'never') return null;
        return theme.card.picture.metColor;
      }),
      new go.Binding('fill', 'met', met => {
        if (!met || met === '' || met === 'never') return null;
        return theme.card.picture.metColor;
      })
    )
  );

export default ProfilePictureWithAdornments;
