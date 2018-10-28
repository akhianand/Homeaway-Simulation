// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware, compose } from "redux";
// import promise from "redux-promise";
// import RootReducer from "./Reducers";
// import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
// import thunkMiddleware from 'redux-thunk'

// const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(RootReducer, composePlugin(applyMiddleware(thunkMiddleware,promise)));

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,

//   document.getElementById("root")
// );
// registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import RootReducer from "./Reducers";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, RootReducer);

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composePlugin(applyMiddleware(thunkMiddleware, promise))
);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
