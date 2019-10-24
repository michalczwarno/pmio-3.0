// @flow
import { Colors } from 'utils/Colors';
const go = typeof window !== 'undefined' ? require('gojs') : null;
const $$ = go && go.GraphObject.make;

const CommentNode = $$(
  go.Node, // this needs to act as a rectangular shape for BalloonLink,
  { background: 'transparent' }, // which can be accomplished by setting the background.
  $$(
    go.TextBlock,
    {
      stroke: 'brown',
      margin: 3,
      editable: true,
      isMultiline: true,
    },
    new go.Binding('text')
  )
);

export default CommentNode;
