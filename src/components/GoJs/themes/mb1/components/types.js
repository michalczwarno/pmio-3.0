// @flow
export type Margin = (t: number, r: number, b: number, l: number) => * | ?number;

export type Go = {
  Picture: () => *,
  Binding: () => *,
  Adornment: (a: *) => *,
  Shape: () => *,
  TextBlock: () => *,
  GraphObject: () => *,
  Size: () => *,
  Spot: () => *,
  Placeholder: () => *,
  Panel: () => *,
  RowColumnDefinition: () => *,
  Margin: Margin,
};

export type $$Type = () => *;

export type Props = {
  go: Go,
  $$: $$Type,
  icon: string,
  column: number,
  property: string,
  tooltipFunc: Function | string | void,
};
