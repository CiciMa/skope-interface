export const WORKSPACE_TOGGLE_MENU = (state, action) => {
  const {
    value,
  } = action;
    
  return {
    ...state,

    workspace: {
      ...state.workspace,

      menuShown: !value,
    },
  };
};
