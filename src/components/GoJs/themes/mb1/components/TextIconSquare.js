// @flow
import Settings from '../settings';
import { mailIcon, mailEmptyIcon } from '../Icons';
import type { Go } from './types';

const TextIconSquare = (go: Go, theme = Settings) => {
  const $$ = go.GraphObject.make;

  const properties = {
    width: theme.card.icon.width + 2,
    height: theme.card.icon.height + 2,
    desiredSize: new go.Size(theme.card.icon.width, theme.card.icon.height),
    font: '12pt Lato serif',
    stroke: 'blue',
    background: 'yellow',
    margin: 0,
    position: new go.Point(100, 80),
  };

  const sendEmail = (event, object) => {
    const { email } = object.part.data;
    const subject = 'Hi';
    const emailBody = 'Hi';
    document.location = `mailto:${email}?subject=${subject}&body=${emailBody}`;
  };

  const IconSquare = $$(
    go.TextBlock,
    { text: 'D' },
    properties,
    { click: sendEmail, doubleClick: sendEmail },
    new go.Binding('source', '', person => (person.email ? mailIcon : mailEmptyIcon))
  );

  IconSquare.toolTip = $$(
    go.Adornment,
    'Auto',
    setControlLayer(),
    $$(go.Shape, {
      name: 'DRAG SHAPE',
      fill: theme.card.note.color,
    }),
    $$(
      go.TextBlock,
      { margin: 5 },
      new go.Binding('text', '', person => (person.email ? person.email : null))
    )
  );

  return IconSquare;
};

export default TextIconSquare;
