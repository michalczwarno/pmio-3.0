/* @noflow */
// icons for the 3rd row of people cards
import {
  selectionAdorment,
  PeopleCardBackground,
  TextBoxes,
  IconsRow,
  ProfilePictureWithAdornments,
  ColorLine,
  PortsList,
  StarIcon,
} from './components';
import Settings from './settings';
import getEventDragAndDrop, { setControlLayer } from './dragAndDrop';
import type { Go } from './components/types';
import { hideIfSanitized } from '../sanitized';

type Params = {
  go: Go,
  $$: () => void,
  thisHandle: Object,
  theme: ?Object,
  sanitized: ?Boolean,
};

export default function makePersonNodeTemplate({
  go,
  $$,
  thisHandle,
  theme,
  sanitized = false,
}: Params) {
  const themeMerged = { ...Settings, ...theme };

  return $$(
    go.Node,
    'Spot',
    { locationSpot: go.Spot.Center },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    { isTreeExpanded: true },
    new go.Binding('isTreeExpanded').makeTwoWay(),
    // properties
    {
      selectable: true,
      selectionAdornmentTemplate: selectionAdorment({ go }),
      resizable: false,
      resizeObjectName: 'PANEL',
      resizeAdornmentTemplate: null, // resizeAdornment({ go }),
      isShadowed: true,
      shadowColor: themeMerged.card.shadowColor,
      shadowBlur: 10,
      shadowOffset: new go.Point(2, 2),
      // functions
      selectionChanged: part => {
        if (part.isSelected) part.layerName = 'Foreground';
        else part.layerName = '';
      },
      doubleClick: thisHandle.openDetailsModal,
      // if do not autoposition it if there are no links to the node
      isLayoutPositioned: false,
      linkConnected: node => {
        if (node.findLinksConnected().count !== 0) node.isLayoutPositioned = true;
      },
      linkDisconnected: node => {
        if (node.findLinksConnected().count === 0) node.isLayoutPositioned = false;
      },
    },
    getEventDragAndDrop(),
    setControlLayer(),

    // the main object is a Panel that surrounds a TextBlock with a Shape
    $$(
      go.Panel,
      'Spot',
      { name: 'PANEL', isClipping: true },
      $$(go.Shape, 'RoundedRectangle', {
        width: theme.card.width,
        height: theme.card.height,
        strokeWidth: 0,
      }),
      new go.Binding('figure'),
      PeopleCardBackground({ go, sanitized }),
      hideIfSanitized(ColorLine({ go, theme }), sanitized),
      hideIfSanitized(
        $$(go.Panel, 'Vertical', { alignment: new go.Spot(0.85, 0.13) }, StarIcon({ go, theme })),
        sanitized
      ),
      $$(
        go.Panel,
        'Vertical',
        { alignment: new go.Spot(0.5, 0.45) },
        ProfilePictureWithAdornments({ go, theme: themeMerged, sanitized }),
        TextBoxes(go, theme).Name,
        TextBoxes(go, theme).Title
      ),
      $$(go.Panel, 'Vertical', { alignment: new go.Spot(0.5, 0.9) }, IconsRow({ go, sanitized }))
    ),
    ...PortsList(go),
    $$('TreeExpanderButton', {
      alignment: go.Spot.Bottom,
      alignmentFocus: go.Spot.Top,
      visible: true,
    })
  );
}
