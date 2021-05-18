import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import TimeCapsule from './components/TimeCapsule/TimeCapsuleMain/TimeCapsule'
// import Main from './components/NoLogin/Main'
// import FeedsBox from './components/Feeds/FeedsBox'
// import VirtualScroller from './components/exercise/VirtualScroller'
// import Apps from './components/Apps'
import Boxx from './components/capsule_css/index'
// import App from './components/capsule_css/App'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Boxx />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
