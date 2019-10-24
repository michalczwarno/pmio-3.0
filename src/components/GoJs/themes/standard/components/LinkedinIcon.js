// @flow
import { linkedinIcon, linkedinEmptyIcon } from 'components/Icons';
import Settings from '../settings';
import type { Go } from './types';

const LinkedinIcon = ({ go, theme = Settings, ...rest }: { go: Go, theme?: ?Object }) => {
  const $$ = go.GraphObject.make;

  const IconProperties = {
    width: theme.card.icon.width,
    height: theme.card.icon.height,
    imageStretch: go.GraphObject.Uniform,
    margin: 0,
    alignment: go.Spot.TopRight,
    desiredSize: new go.Size(theme.card.icon.width, theme.card.icon.height),
    name: 'linkedin',
    ...rest,
  };

  // eslint-disable-next-line
  const openLinkedin = (event, object) => {
    if (object.part.data.linkedin) window.open(encodeURI(object.part.data.linkedin));
    else if (object.part.data.name) {
      // const url = `https://www.linkedin.com/search/results/people/?facetCurrentCompany=${company}&keywords=${name)`
      const url = `https://www.linkedin.com/search/results/people/?keywords=${
        object.part.data.name
      }`;
      window.open(encodeURI(url));
    }
  };

  const IconSquare = $$(
    go.Picture,
    IconProperties,
    { click: openLinkedin, doubleClick: openLinkedin },
    new go.Binding('source', '', person => (person.linkedin ? linkedinIcon : linkedinEmptyIcon))
  );

  return IconSquare;
};

export default LinkedinIcon;
