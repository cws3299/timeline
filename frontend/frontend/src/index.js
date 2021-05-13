import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import TimeCapsule from './components/TimeCapsule/TimeCapsuleMain/TimeCapsule'
import NoLogin from './components/NoLogin/NoLogin'
import NoLogin2 from './components/NoLogin2/NoLogin2'
// import AppA from './components/NoLogin/app'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <NoLogin2 />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
