import React from "react";

export default (state, action) => {
  switch (action.type) {
    case "ADD_ALL_PROFILES":
      return {
        allProfiles: action.payload,
      };
    case "ADD_OR_REMOVE_PROFILE":
      return {
        likedProfiles: action.payload,
      };

    default:
      return state;
  }
};
