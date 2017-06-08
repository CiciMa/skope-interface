/**
 * This reducer is used when filter value is changed.
 */

import { filterMax } from "/imports/ui/consts";

export const WORKSPACE_SET_FILTER_FROM_URL = (state, action) => {
  const {
    value1,
    value2,
    value3,
  } = action;
  const filterValue = typeof value1 === 'undefined' ? 2000 : parseInt(value1);
  const filterMin = typeof value2 === 'undefined' ? 0 : parseInt(value2);
  const filterMax = typeof value3 === 'undefined' ? 2000 : parseInt(value3);

  return {
    ...state,

    workspace: {
      ...state.workspace,

      filterValue,
      filterMin,
      filterMax,
    },
  };
};
