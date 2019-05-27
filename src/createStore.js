import { createStore, applyMiddleware } from "redux";
import thunk from "react-thunk";
import reducers from "./reducer";

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));

  return store;
};
