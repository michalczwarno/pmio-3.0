import { combineReducers } from "redux";
import { reducer as firebase } from "react-redux-firebase";
import {firestoreReducer as firestore} from 'redux-firestore' // <- needed if using firestore


const rootReducer = combineReducers({
  firebase,
  firestore
});

export default rootReducer;
