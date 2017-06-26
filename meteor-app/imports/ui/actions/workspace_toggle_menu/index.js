import PropTypes from "prop-types";

export const WORKSPACE_TOGGLE_MENU = {
  type: "WORKSPACE_TOGGLE_MENU",
  payloadSchema: {
    value: PropTypes.bool.isRequired,
  },
};
