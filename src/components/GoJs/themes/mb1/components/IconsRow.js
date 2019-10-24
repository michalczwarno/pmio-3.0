// @flow
import { championIcon, noteIcon, linkedinIcon, linkedinEmptyIcon } from 'components/Icons';
import Colors from 'utils/Colors';
import type { Go } from './types';
import Settings from '../settings';
import { makeIconSquare } from './index.js';

const LINKEDIN_URL_PREFIX = 'www.linkedin.com/in/';
const HTTP_PREFIX = 'http:';
const HTTPS_PREFIX = 'https:';

type Params = {
  go: Go,
  theme?: Object,
};

const linkedinIconSquare = go =>
  makeIconSquare({
    go,
    alignment: go.Spot.Top,
    icon: person => (person.linkedin ? linkedinIcon : linkedinEmptyIcon),
    // eslint-disable-next-line
    click: (event, object) => {
      if (object.part.data.linkedin) {
        let linkedinAddress = object.part.data.linkedin;
        if (
          linkedinAddress.indexOf(HTTPS_PREFIX) === -1 &&
          linkedinAddress.indexOf(HTTP_PREFIX) === -1
        ) {
          // if there is no http or https prefix, then it is just a linkedin handle
          linkedinAddress = `${HTTPS_PREFIX}//${LINKEDIN_URL_PREFIX}${linkedinAddress}`;
        }
        window.open(encodeURI(linkedinAddress));
      } else if (object.part.data.name) {
        // TODO: add seach based on company
        const url = `https://www.linkedin.com/search/results/people/?keywords=${object.part.data.name}`;
        window.open(encodeURI(url));
      }
    },
  });

export default function IconsRow({ go, theme = Settings, sanitized = false }: Params) {
  const $$ = go.GraphObject.make;
  const sideMargin = theme.card.icon.margin;

  if (sanitized) {
    return $$(
      go.Panel,
      'Table',
      {
        alignment: go.Spot.Left,
        desiredSize: new go.Size(theme.card.width, theme.card.icon.height + sideMargin),
      },
      $$(
        go.Panel,
        'Auto',
        {
          row: 0,
          column: 0,
          alignment: go.Spot.Right,
          padding: new go.Margin(sideMargin, theme.card.icon.width + sideMargin * 2, 0, 0),
        },
        linkedinIconSquare(go)
      )
    );
  }

  return $$(
    go.Panel,
    'Horizontal',
    {
      defaultAlignment: go.Spot.Bottom,
      desiredSize: new go.Size(theme.card.width, theme.card.icon.height + 4),
    },
    makeIconSquare({
      go,
      icon: person => (person.champion ? championIcon : ''),
      tooltipFunc: person => (person.target ? 'Champion,\n wants to help with the deal' : null),
    }),
    go.GraphObject.make(
      go.TextBlock,
      {
        text: '$',
        font: 'bold 16px Lato',
        stroke: null,
        margin: new go.Margin(0, sideMargin, 0, sideMargin),
        desiredSize: new go.Size(16, 16),
      },
      new go.Binding('stroke', 'role', role => (role === 'buyer' ? 'black' : null))
    ),
    go.GraphObject.make(
      go.TextBlock,
      {
        text: 'D',
        font: 'bold 16px Lato',
        margin: new go.Margin(0, sideMargin, 0, sideMargin),
        desiredSize: new go.Size(16, 16),
        stroke: null,
      },
      new go.Binding('text', 'role', role => (role ? role[0].toUpperCase() : null)),
      new go.Binding('stroke', 'role', role => (role ? Colors.blue : null))
    ),
    linkedinIconSquare(go),
    makeIconSquare({
      go,
      icon: person => (person.notes && person.notes ? noteIcon : null),
      tooltipFunc: person => (person.notes && person.notes ? person.notes : null),
    })
  );
}
