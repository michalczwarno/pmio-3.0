// @flow
import { emailIcon, emailEmptyIcon } from 'components/Icons';
import Settings from '../settings';
import type { Go } from './types';

const PictureIcon = (go: Go, theme?: Object = Settings) => {
  const $$ = go.GraphObject.make;

  const pictureProperties = {
    width: theme.card.icon.width,
    height: theme.card.icon.height,
    imageStretch: go.GraphObject.Uniform,
    margin: 0,
    alignment: go.Spot.TopRight,
    desiredSize: new go.Size(theme.card.icon.width, theme.card.icon.height),
    name: 'mailPicture',
  };

  const sendEmail = (event, object) => {
    if (object.part.data.email) {
      const { email } = object.part.data;
      const subject = 'Hi';
      const emailBody = 'Hi';
      document.location = `mailto:${email}?subject=${subject}&body=${emailBody}`;
    }
  };

  const IconSquare = $$(
    go.Picture,
    pictureProperties,
    { click: sendEmail, doubleClick: sendEmail },
    new go.Binding('source', '', person => (person.email ? emailIcon : emailEmptyIcon))
  );

  IconSquare.toolTip = $$(
    go.Adornment,
    'Auto',
    $$(go.Shape, { fill: Settings.card.note.color }),
    $$(
      go.TextBlock,
      { margin: 5 },
      new go.Binding('text', '', person => (person.email ? person.email : null))
    )
  );

  return IconSquare;
};

export default PictureIcon;
