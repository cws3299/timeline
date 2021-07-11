import React from 'react'
import IntroButtonBox from '../components/Intro/IntroButtonBox'
import IntroTimer from '../components/Intro/IntroTimer'
import './Intro.css'

function Intro() {
    return(
        <div className="Intro">
            < IntroButtonBox className="IntroButtonBox1" />
            < IntroTimer  className="IntroTimer1" />
        </div>
    )
}

export default Intro;