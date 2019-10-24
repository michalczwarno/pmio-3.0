// @flow
const go = typeof window !== 'undefined' ? require('gojs') : null;
const $$ = go && go.GraphObject.make;

const SimpleNode = $$(
  go.Node,
  'Auto', // the Shape will go around the TextBlock
  $$(
    go.Shape,
    'Rectangle',
    { strokeWidth: 0 },
    // Shape.fill is bound to Node.data.color
    new go.Binding('fill', 'color')
  ),
  $$(
    go.TextBlock,
    { margin: 8 }, // some room around the text
    // TextBlock.text is bound to Node.data.key
    new go.Binding('text', 'key')
  )
);

export default SimpleNode;
