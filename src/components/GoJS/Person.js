// @flow
const go = typeof window !== 'undefined' ? require('gojs') : null;
const { Part, TextBlock, Point } = window && require('gojs');
const $$ = go && go.GraphObject.make;

const Person = (name = 'test') =>
  $$(
    Part,
    {
      location: new Point(0, 0),
      selectable: false,
      isLayoutPositioned: false,
      layerName: 'Grid',
    },
    $$(TextBlock, name, { font: 'bold 24pt sans-serif', stroke: 'green' })
  );

export default Person;
