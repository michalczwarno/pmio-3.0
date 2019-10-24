// @flow
// conditional import
const go = window ? require('gojs') : null;
const $$ = go && go.GraphObject ? go.GraphObject.make : null;

const Legend = (companyName = 'Company name') =>
  go &&
  $$(
    go.Part,
    {
      location: new go.Point(0, 0),
      selectable: false,
      isLayoutPositioned: false,
      layerName: 'Grid',
    },
    $$(go.TextBlock, companyName, {
      font: 'bold 24pt sans-serif',
      stroke: 'green',
    })
  );

export default Legend;
