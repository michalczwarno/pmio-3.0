// @flow
import * as basicTheme from './standard';
import * as theme2017 from './mb1';

export const getTheme = (name?: string | undefined) =>
  name === 'basicTheme' ? basicTheme : theme2017;

export const nextTheme = (name: string) => (name !== 'basicTheme' ? basicTheme : theme2017);
