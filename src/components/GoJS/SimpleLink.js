// @flow
const go = typeof window !== 'undefined' ? require('gojs') : null;
const $$ = go && go.GraphObject.make;

const Link = $$(
  'Link',
  $$('Shape', { strokeWidth: 1.5 }),
  $$('Shape', { toArrow: 'Standard', stroke: null })
);

export default Link;
