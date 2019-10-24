// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { defaultProfileIcon } from './index';
import base, { filename } from 'paths.macro';
import { namePath, transformFilename } from 'stories/utils/namePath';

storiesOf(namePath(base), module).add(transformFilename(filename), () => (
  <div>
    <h4>Default Profile Icon</h4>
    <img src={defaultProfileIcon} alt="defaultProfileIcon" />
  </div>
));
