import React from 'react'
import TimeCapsuleList from './TimeCapsuleList'
import TimeCapsuleNav from './TimeCapsuleNav'
import { createGlobalStyle } from 'styled-components';
import './TimeCapsule.css';
const GlobalStyle = createGlobalStyle`
  body {
    background: #534847;
  }
`;

function TimeCapsule() {
    return (
        <div className = "TimeCapsule">
            <TimeCapsuleList />
            <TimeCapsuleNav />
        </div>
    )
};

export default TimeCapsule;