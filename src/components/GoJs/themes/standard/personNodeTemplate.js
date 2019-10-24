/* @noflow */
// icons for the 3rd row of people cards
import { attitudeOptions } from 'utils/types';
import Dimensions from './dimensionHelper';
import commentsIcon from './images/comment.png';
import targetIcon from './images/target.png';
import metIcon from './images/checkMark.png';
import budgetIcon from './images/dollarSign.png';
import championIcon from './images/prize.png';
import linkedInIcon from './images/linkedin.png';
import emptyIcon from './images/empty.png';
import { Go } from './components/types';
import { hideIfSanitized } from '../sanitized';
import settings from './settings';

type Params = {
  go: Go,
  $$: () => void,
  thisHandle: Object,
  theme: ?Object,
  sanitized: ?Boolean,
  toDo: ?Boolean,
};

export default function makePersonNodeTemplate({
  go,
  $$,
  thisHandle,
  theme = settings,
  sanitized = false,
  toDo = false,
}: Params) {
  const nodeSelectionAdornmentTemplate = $$(
    go.Adornment,
    'Auto',
    $$(go.Shape, { fill: null, stroke: 'deepskyblue', strokeWidth: 2, strokeDashArray: [4, 2] }),
    $$(go.Placeholder)
  );

  const nodeResizeAdornmentTemplate = $$(
    go.Adornment,
    'Spot',
    { locationSpot: go.Spot.Right },
    $$(go.Placeholder),
    $$(go.Shape, {
      alignment: go.Spot.TopLeft,
      cursor: 'nw-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.Top,
      cursor: 'n-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.TopRight,
      cursor: 'ne-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.Left,
      cursor: 'w-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.Right,
      cursor: 'e-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.BottomLeft,
      cursor: 'se-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.Bottom,
      cursor: 's-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    }),
    $$(go.Shape, {
      alignment: go.Spot.BottomRight,
      cursor: 'sw-resize',
      desiredSize: new go.Size(6, 6),
      fill: 'lightblue',
      stroke: 'deepskyblue',
    })
  );

  function makePort(name, spot, output, input) {
    // the port is basically just a small transparent square
    return $$(go.Shape, 'Circle', {
      fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
      stroke: null,
      desiredSize: new go.Size(8, 8),
      alignment: spot, // align the port on the main Shape
      alignmentFocus: spot, // just inside the Shape
      portId: name, // declare this object to be a 'port'
      fromSpot: spot,
      toSpot: spot, // declare where links may connect at this port
      fromLinkable: output,
      toLinkable: input, // declare whether the user may draw links to/from here
      cursor: 'pointer', // show a different cursor to indicate potential link point
    });
  }

  function showSmallPorts(node, show) {
    node.ports.each(port => {
      if (port.portId !== '') {
        // don't change the default port, which is the big shape
        port.fill = show ? 'rgba(0,0,0,.15)' : null;
      }
    });
  }

  const linkedinIconSquare = () =>
    $$(
      go.Picture,
      { column: 5 },
      { width: theme.card.rowIcon.width, height: theme.card.rowIcon.height },
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
    );

  function makeRowWithIcons() {
    if (sanitized) {
      return $$(
        go.Panel,
        'Table',
        { row: 3 },
        {
          defaultAlignment: go.Spot.Right,
          desiredSize: new go.Size(
            Dimensions.cardWidth() - theme.card.rowIcon.margin,
            theme.card.rowIcon.height
          ),
        },
        $$('TreeExpanderButton', { alignment: go.Spot.BottomCenter, columnSpan: 99 }),
        $$(
          go.Panel,
          'Auto',
          {
            row: 0,
            column: 0,
            alignment: go.Spot.Right,
            padding: new go.Margin(0, theme.card.rowIcon.width, 0, 0),
            margin: new go.Margin(0, theme.card.rowIcon.margin * 2, 0, 0),
            // margin: new go.Margin(0, 4, 0, 0),
          },
          linkedinIconSquare()
        )
      );
    }

    return $$(
      go.Panel,
      'Table',
      { row: 3 },
      { defaultAlignment: go.Spot.BottomRight },
      $$(go.RowColumnDefinition, { column: 3, minimum: 20 }),
      $$('TreeExpanderButton', { alignment: go.Spot.BottomCenter, columnSpan: 99 }),
      $$(
        go.Picture,
        { column: 0 },
        { width: theme.card.rowIcon.width, height: theme.card.rowIcon.height },
        new go.Binding('source', '', person => {
          if (person.met) return metIcon;
          return emptyIcon;
        }),
        {
          // define a tooltip for each node that displays the color as text
          toolTip: $$(
            go.Adornment,
            'Auto',
            $$(go.Shape, { fill: '#FFFFCC' }),
            $$(
              go.TextBlock,
              { margin: theme.card.rowIcon.margin },
              new go.Binding('text', '', person => {
                if (person.met)
                  return `Have met him/her.\n Relationship owner: ${person.relationshipOwner}`;
                return 'Have NOT met him/her';
              })
            )
          ), // end of Adornment
        }
      ),
      $$(
        go.Picture,
        { column: 1 },
        { width: theme.card.rowIcon.width, height: theme.card.rowIcon.height },
        new go.Binding('source', '', person => {
          if (person.target) return targetIcon;
          return emptyIcon;
        }),
        {
          // define a tooltip for each node that displays the color as text
          toolTip: $$(
            go.Adornment,
            'Auto',
            $$(go.Shape, { fill: '#FFFFCC' }),
            $$(
              go.TextBlock,
              { margin: theme.card.rowIcon.margin },
              new go.Binding('text', '', person => {
                if (person.target)
                  return 'Key executive, Targeted in this deal (to meet and build reltionship)';
                return '';
              })
            )
          ), // end of Adornment
        }
      ),
      $$(
        go.Picture,
        { column: 2 },
        { width: theme.card.rowIcon.width, height: theme.card.rowIcon.height },
        new go.Binding('source', 'champion', champion =>
          champion === true ? championIcon : emptyIcon
        ),
        {
          // define a tooltip for each node that displays the color as text
          toolTip: $$(
            go.Adornment,
            'Auto',
            $$(go.Shape, { fill: '#FFFFCC' }),
            $$(go.TextBlock, 'Internal champion -- wants to help with a deal')
          ), // end of Adornment
        }
      ),
      $$(
        go.Picture,
        { column: theme.card.rowIcon.margin },
        { width: theme.card.rowIcon.width, height: theme.card.rowIcon.height },
        { imageStretch: go.GraphObject.Uniform },
        new go.Binding('source', 'budgetOwner', budgetOwner =>
          budgetOwner === true ? budgetIcon : emptyIcon
        ),
        {
          // define a tooltip for each node that displays the color as text
          toolTip: $$(
            go.Adornment,
            'Auto',
            $$(go.Shape, { fill: '#FFFFCC' }),
            $$(go.TextBlock, 'Economic Buyer / Budget Owner')
          ), // end of Adornment
        }
      ),
      linkedinIconSquare(),
      $$(
        go.Picture,
        { column: 6 },
        { width: theme.card.rowIcon.width, height: theme.card.rowIcon.height },
        new go.Binding('source', 'notes', notes => (notes || notes !== '' ? commentsIcon : null)),
        {
          // define a tooltip for each node that displays the color as text
          toolTip: $$(
            go.Adornment,
            'Auto',
            $$(go.Shape, { fill: '#FFFFCC' }),
            $$(
              go.TextBlock,
              { margin: theme.card.rowIcon.margin },
              new go.Binding('text', '', person =>
                person.notes && person.notes !== '' ? person.notes : ''
              )
            )
          ), // end of Adornment
        }
      )
    );
  }

  function getColorForAttitude(person) {
    const { attitudeTowardsDeal } = person;
    const attidudeData = attitudeOptions.find(item => item.id === attitudeTowardsDeal);
    const color = (attidudeData && attidudeData.color) || person.fill || 'white'; // default value
    return color;
  }

  return $$(
    go.Node,
    'Spot',
    { locationSpot: go.Spot.Center },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    {
      visible: !(sanitized && toDo),
      selectable: true,
      selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
    },
    {
      resizable: false,
      resizeObjectName: 'PANEL',
      resizeAdornmentTemplate: nodeResizeAdornmentTemplate,
    },
    { isLayoutPositioned: false },
    {
      selectionChanged: part => {
        if (part.isSelected) part.layerName = 'Foreground';
        else part.layerName = '';
      },
    },
    { doubleClick: thisHandle.openDetailsModal },
    {
      linkConnected: node => {
        // node, link, port
        if (node.findLinksConnected().count !== 0) {
          node.isLayoutPositioned = true;
        }
      },
    },
    {
      linkDisconnected: node => {
        if (node.findLinksConnected().count === 0) {
          node.isLayoutPositioned = false;
        }
      },
    },
    // the main object is a Panel that surrounds a TextBlock with a Shape
    $$(
      go.Panel,
      'Auto',
      { name: 'PANEL' },
      // new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
      $$(
        go.Shape,
        'Rectangle', // default figure
        {
          fill: 'white', // default color
          strokeWidth: 1, // default strokeWidth
        },
        { width: Dimensions.cardWidth(), height: Dimensions.cardHeight() },
        new go.Binding('figure'),
        new go.Binding('stroke'),
        new go.Binding('strokeCap'),
        new go.Binding('strokeWidth').makeTwoWay(),
        hideIfSanitized(new go.Binding('fill', '', getColorForAttitude), sanitized)
      ),
      $$(
        go.Panel,
        'Table',
        { fromLinkable: false, toLinkable: false },
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
          { minSize: new go.Size(150, 15) }, // width - 10, height 2* font size + margin
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
          { minSize: new go.Size(150, 25) }, // width - 10, height 2* font size + margin
          new go.Binding('text', 'title').makeTwoWay()
        ),
        toDo ? {} : makeRowWithIcons() // { width: 140, height: 40 },  width - 10, height 20*2
      )
    ),
    // four small named ports, one on each side:
    makePort('T', go.Spot.Top, false, true),
    makePort('L', go.Spot.Left, true, true),
    makePort('R', go.Spot.Right, true, true),
    makePort('B', go.Spot.Bottom, true, false),
    {
      // handle mouse enter/leave events to show/hide the ports
      // eslint-disable-next-line
      mouseEnter: (event, node) => {
        showSmallPorts(node, true);
      },
      // eslint-disable-next-line
      mouseLeave: (event, node) => {
        showSmallPorts(node, false);
      },
    }
  );
}
