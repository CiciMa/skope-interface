/**
 * This reducer is used when filter value is changed.
 */

import { filterMax } from "/imports/ui/consts";

export const WORKSPACE_SET_FILTER_MIN_FROM_URL = (state, action) => {
  const {
    value,
  } = action;
  const filterMin = typeof value === 'undefined' ? 0 : parseInt(value);

  return {
    ...state,

    workspace: {
      ...state.workspace,

      filterMin,
    },
  };
};
