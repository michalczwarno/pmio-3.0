// @flow
import iconsDefinitions from './iconsDefinitions';
const go = window && require('gojs');

// conditional import
const $$ = go && go.GraphObject ? go.GraphObject.make : null;

const Icon = ({ icon, fill = 'black', height = 16, width = 16, ...restProps }: Object) => {
  //
  Icon.icon = icon;
  Icon.fill = fill;
  Icon.height = height;
  Icon.width = width;
  const getGeometry = (geometryName: ?string) => {
    const geometry = typeof geometryName === 'string' ? iconsDefinitions[geometryName] : 'heart';
    return go.Geometry.parse(geometry, true);
  };

  const IconWithFont = (letter: string = '?') =>
    go &&
    $$(
      go.TextBlock,
      {
        text: letter,
        font: `bold${height - 4 || '14'}px Lato`,
      },
      { ...restProps }
    );

  const IconWithShape = () =>
    go &&
    $$(
      go.Shape,
      {
        geometry: getGeometry(Icon.icon),
        stroke: null,
        fill: 'white',
      },
      { fill, height, width, ...restProps }
    );

  if (!Icon.icon) return IconWithFont('?');
  if (Icon.icon && typeof Icon.icon === 'string' && Icon.icon.length === 1)
    return IconWithFont(Icon.icon[0]);
  return IconWithShape();
};

export default Icon;
