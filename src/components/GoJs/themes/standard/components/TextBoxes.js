// @flow
import type { Go } from './types';
import Settings from '../settings';

const TextBoxes = (go: Go, theme = Settings) => {
  const $$ = go.GraphObject.make;
  const textBoxProps = {
    textAlign: 'center',
    alignment: go.Spot.Center,
    width: theme.card.width,
    // height: 18,
    margin: 2,
    wrap: go.TextBlock.WrapFit,
    editable: false,
  };

  const Name = $$(
    go.TextBlock, // Name
    { ...textBoxProps },
    {
      row: 0,
      font: `bold ${theme.card.name.fontSize}pt ${theme.card.name.fontType}, Arial, sans-serif`,
      stroke: theme.card.name.fontColor,
      isMultiline: false,
      wrap: go.TextBlock.WrapFit,
      maxSize: new go.Size(theme.card.width, theme.card.name.fontSize + 2),
    },
    new go.Binding('text', 'name').makeTwoWay()
  );

  const Title = $$(
    go.TextBlock, // Title
    { ...textBoxProps },
    {
      row: 1,
      font: `${theme.card.title.fontSize - 2}pt ${theme.card.title.fontType}, Arial, sans-serif`,
      stroke: theme.card.title.fontColor,
      maxSize: new go.Size(theme.card.width, theme.card.title.fontSize * 2),
      isMultiline: true,
    },
    new go.Binding('text', 'title').makeTwoWay()
  );

  return {
    Name,
    Title,
  };
};

export default TextBoxes;
