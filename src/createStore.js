import { createStore } from "redux";
import rootReducer from "./reducer";

export default function configureStore(initialState, history) {
  return createStore(rootReducer);
}
