import React from'react';
import './Intro.css';
import IntroLeft from '../components/IntroLeft';
// import IntroButtonBox from '../components/IntroButtonBox';


function Intro() {
    return(
        <div className ='Intro'>
            <div className = "IntroBox">
                <IntroLeft className="IntroLeft" />
                <div className = "IntroRight">
                  <div className = "IntroRightTop">

                  </div>
                  <div className = "IntroRightBottom">
                    
                  </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;