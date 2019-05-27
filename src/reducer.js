const initialState = {
  posts: [],
  allPost: [],
  loadedPost: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_POST":
      return {
        ...state,
        posts: action.val
      };

    case "ALL_POST_STORE":
      return {
        ...state,
        allPost: action.val
      };

    case "LOAD_POST":
      return {
        ...state,
        loadedPost: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
