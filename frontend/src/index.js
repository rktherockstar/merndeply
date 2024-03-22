import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from 'react-redux';
import {thunk} from "redux-thunk";

let initialStore = {
  userDetails: {},
};

let loginReducer = (state = initialStore, action) => {
  if(action.type === "login"){
    return {...state, userDetails: action.data};
  }
  return state;
};

let store = createStore(combineReducers({loginReducer}), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
