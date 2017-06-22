export const WORKSPACE_CLOSE_WELCOME_WINDOW = (state, action) => {
  const {
    welcomeWindowClosed,
  } = action;
    
  return {
    ...state,

    workspace: {
      ...state.workspace,

      welcomeWindowClosed,
    },
  };
};
