import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/firestore"; // <- needed if using firestore
import "firebase/database";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore
import createStore from "./createStore";
import { BrowserRouter } from "react-router-dom";
// Material UI initiation
import CssBaseline from "@material-ui/core/CssBaseline";
// visible components
import AppBar from "./components/MenuBar/MenuBar";
import Routes from "./containers/App/Routes";

const fbConfig = {
  apiKey: "AIzaSyDKb2BW7KKxLQgUf54Zy6I74gHTwZSw7g0",
  authDomain: "datastore-test-001.firebaseapp.com",
  databaseURL: "https://datastore-test-001.firebaseio.com",
  projectId: "datastore-test-001",
  storageBucket: "datastore-test-001.appspot.com",
  messagingSenderId: "590394199939",
  appId: "1:590394199939:web:3013bd06fc0c6c0b"
};

try {
  firebase.initializeApp(fbConfig);
  firebase.firestore(); // <- needed if using firestore
} catch (err) {}

const store = createStore();

const rrfProps = {
  firebase,
  config: {
    userProfile: "users"
  },
  dispatch: store.dispatch,
  createFirestoreInstance
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <CssBaseline />
          <AppBar />
          <Routes />
        </ReactReduxFirebaseProvider>
      </Provider>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById("root"));
