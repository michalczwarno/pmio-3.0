// @flow
import { Colors } from 'utils/Colors';
import { BalloonLink } from './components/BalloonLink';

const go = typeof window !== 'undefined' ? require('gojs') : null;
const $$ = go && go.GraphObject.make;

const CommentLink = $$(
  typeof BalloonLink === 'function' ? BalloonLink : go.Link,
  $$(
    go.Shape, // the Shape.geometry will be computed to surround the comment node and
    // point all the way to the commented node
    {
      stroke: 'brown',
      strokeWidth: 1,
      fill: '#ffcc00', // this is to match colors from goJs theme textLabel.background
    }
  )
);

export default CommentLink;
