// @flow
import { championIcon, noteIcon, linkedinIcon, linkedinEmptyIcon } from 'components/Icons';
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

export default function IconsRow({ go, theme = Settings }: Params) {
  const $$ = go.GraphObject.make;
  const sideMargin = theme.card.icon.margin;

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
      new go.Binding('stroke', 'budgetOwner', budgetOwner => (budgetOwner ? 'lightGreen' : null))
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
      new go.Binding('text', 'influence', influence =>
        influence ? influence[0].toUpperCase() : 'D'
      ),
      new go.Binding('stroke', 'influence', influence =>
        influence && influence !== '?' ? '#007aff' : null
      )
    ),
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
            linkedinAddress = LINKEDIN_URL_PREFIX + linkedinAddress;
          }
          window.open(encodeURI(linkedinAddress));
        } else if (object.part.data.name) {
          // TODO: add seach based on company
          // const url = `https://www.linkedin.com/search/results/people/?facetCurrentCompany=${company}&keywords=${name)`
          const url = `https://www.linkedin.com/search/results/people/?keywords=${
            object.part.data.name
          }`;
          window.open(encodeURI(url));
        }
      },
    }),
    makeIconSquare({
      go,
      icon: person => (person.notes && person.notes !== '' ? noteIcon : null),
      tooltipFunc: person => (person.notes && person.notes !== '' ? person.notes : null),
    })
  );
}
