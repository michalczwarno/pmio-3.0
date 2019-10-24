// @flow
import { defaultProfileIcon as profilePicturePlaceholder } from 'components/Icons';
import type { Go } from './types';
import Settings from '../settings';

const Picture = ({ go, theme }: { go: Go, theme?: Object }) =>
  go &&
  go.GraphObject.make(
    go.Picture, // Title
    {
      source: profilePicturePlaceholder,
      width: theme.card.picture.width,
      height: theme.card.picture.height,
    },
    new go.Binding('source', 'pictureUrl', pictureUrl =>
      pictureUrl && pictureUrl !== '' ? pictureUrl : profilePicturePlaceholder
    )
  );

const ProfilePicture = ({ go, theme = Settings }: { go: Go, theme?: Object }) =>
  go &&
  go.GraphObject.make(
    go.Panel,
    'Spot',
    {
      isClipping: true,
      alignment: go.Spot.Top,
      margin: new go.Margin(0, 0, 0, 0),
      width: theme.card.picture.width,
      height: theme.card.picture.height,
    },
    go.GraphObject.make(go.Shape, 'Circle', {
      width: theme.card.picture.width,
      height: theme.card.picture.width,
    }),
    Picture({ go, theme })
  );

export default ProfilePicture;
