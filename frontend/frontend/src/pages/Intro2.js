import React from'react';
import './Intro2.css';
import IntroTimer from '../components/IntroTimer';
import IntroButtonBox from '../components/IntroButtonBox';


function Intro2() {
    return(
        <div className ='Intro2'>
            <IntroButtonBox />
            <IntroTimer />
        </div>
    );
}

export default Intro2;