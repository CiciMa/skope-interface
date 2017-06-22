export const WORKSPACE_CLOSE_WELCOME_WINDOW = (state, action) => {
  const welcomeWindowClosed = true;

  return {
    ...state,

    workspace: {
      ...state.workspace,

      welcomeWindowClosed,
    },
  };
};
