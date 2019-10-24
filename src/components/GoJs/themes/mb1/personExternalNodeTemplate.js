import settings from './settings';
import linkedInIcon from './images/linkedin.png';
import emptyIcon from './images/empty.png';

export default function makePersonExternalNodeTemplate({ go, $$ }) {
  function makePort(name, spot, output, input) {
    // the port is basically just a small transparent square
    return $$(go.Shape, 'Circle', {
      fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
      stroke: null,
      desiredSize: new go.Size(7, 7),
      alignment: spot, // align the port on the main Shape
      alignmentFocus: spot, // just inside the Shape
      portId: name, // declare this object to be a 'port'
      fromSpot: spot,
      toSpot: spot, // declare where links may connect at this port
      fromLinkable: output,
      toLinkable: input, // declare whether the user may draw links to/from here
      cursor: 'pointer', // show a different cursor to indicate potential link point,
    });
  }

  function makeRowWithIcons() {
    return $$(
      go.Panel,
      'Table',
      { row: 3 },
      { defaultAlignment: go.Spot.BottomRight },
      $$(go.RowColumnDefinition, { column: 4, minimum: 20 }),
      $$(
        go.Picture,
        { column: 1 },
        { width: 20, height: 20 },
        { imageStretch: go.GraphObject.Uniform },
        {
          // eslint-disable-next-line
          click: function openLinkedinPage(event, object) {
            if (object.part.data.linkedin) window.open(encodeURI(object.part.data.linkedin));
          },
          // eslint-disable-next-line
          doubleClick: function openLinkedinPage(event, object) {
            if (object.part.data.linkedin) window.open(encodeURI(object.part.data.linkedin));
          },
        },
        new go.Binding('source', 'linkedin', linkedin => (linkedin ? linkedInIcon : emptyIcon))
      )
    );
  }

  return $$(
    go.Node,
    'Spot',
    { locationSpot: go.Spot.Center },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    { selectable: false },
    { fromLinkableDuplicates: false, toLinkableDuplicates: false },
    // the main object is a Panel that surrounds a TextBlock with a Shape
    $$(
      go.Panel,
      'Auto',
      { name: 'PANEL' },
      $$(
        go.Shape,
        'Rectangle', // default figure
        {
          portId: '', // the default port: if no spot on link data, use closest side
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer',
          fill: 'white', // default color
          strokeWidth: 1, // default strokeWidth
        },
        { width: settings.card.width, height: settings.card.height },
        new go.Binding('figure')
      ),
      $$(
        go.Panel,
        'Table',
        $$(
          go.TextBlock, // Name
          {
            row: 0,
            font: 'bold 10pt Helvetica, Arial, sans-serif',
            textAlign: 'center',
            margin: 2,
            editable: false,
          },
          { isMultiline: true },
          { minSize: new go.Size(150, 14) }, // width - 10, height 2* font size + margin
          new go.Binding('text', 'name').makeTwoWay()
        ),
        $$(
          go.TextBlock, // Title
          {
            row: 1,
            textAlign: 'center',
            margin: new go.Margin(2, 10, 2, 10),
            font: '8pt Helvetica, Arial, sans-serif',
            width: 146, // TODO: this value is calculated manually, it should be set automatically
            isMultiline: true,
            wrap: go.TextBlock.WrapFit,
            editable: false,
          },
          { minSize: new go.Size(150, 24) }, // width - 10, height 2* font size + margin
          new go.Binding('text', 'title').makeTwoWay()
        ),
        makeRowWithIcons() // { width: 140, height: 40 },  width - 10, height 20*2
      )
    ),
    // four small named ports, one on each side:
    makePort('T', go.Spot.Top, false, true),
    makePort('L', go.Spot.Left, true, true),
    makePort('R', go.Spot.Right, true, true),
    makePort('B', go.Spot.Bottom, true, false)
  );
}
