import React from'react';
import './IntroLeft.css';
import IntroLeftTop from './IntroLeftTop'


function IntroLeft() {
    return(
        <div className ='IntroLeft'>
            <div className="header"></div>
            <IntroLeftTop className ="IntroLeftTop"/>
            <div className="footer"></div>
        </div>
    );
}

export default IntroLeft;