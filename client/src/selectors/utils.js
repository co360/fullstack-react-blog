import _ from 'lodash';
import { createSelectorCreator, defaultMemoize } from 'reselect';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);
