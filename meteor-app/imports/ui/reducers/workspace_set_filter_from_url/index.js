/**
 * This reducer is used when filter value is changed.
 */

import { filterMax } from "/imports/ui/consts";

export const WORKSPACE_SET_FILTER_FROM_URL = (state, action) => {
  const {
    value1,
    value2,
  } = action;
  const filterValue = typeof value1 === 'undefined' ? filterMax : parseInt(value);
  const filterMin = typeof value2 === 'undefined' ? 0 : parseInt(value);

  return {
    ...state,

    workspace: {
      ...state.workspace,

      filterValue,
      filterMin,
    },
  };
};
