const initialState = {
  all_users: [],
  bookmark_users: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_USER_DATA":
      return {
        ...state,
        all_users: action.payload,
      };
    case "ADD_USER_IN_BOOKMARK":
      return {
        ...state,
        bookmark_users: action.payload,
      };
    default: {
      return state;
    }
  }
};
