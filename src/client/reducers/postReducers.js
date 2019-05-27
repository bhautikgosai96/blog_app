import { POST_STORE } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case POST_STORE:
      return action.payload.data;
    default:
      return state;
  }
};
