import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD:new_frontend/new_frontend/src/index.js
import App from './App';
=======
import App from "./shared/App";
import store from "./redux/configureStore";
>>>>>>> 6c7d3e36853c3cd9d7abd051f2f837df1dbd0728:frontend/frontend/src/index.js
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import { Provider } from "react-redux";


axios.defaults.withCredentials = true;

ReactDOM.render(
<<<<<<< HEAD:new_frontend/new_frontend/src/index.js
  <React.StrictMode>
    <App />
  </React.StrictMode>,
=======
  <Provider store={store}>
    <App />
  </Provider>,
>>>>>>> 6c7d3e36853c3cd9d7abd051f2f837df1dbd0728:frontend/frontend/src/index.js
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
