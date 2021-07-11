import React from 'react'
import NavBar from '../components/NavBar'
import TimeLineCreate from '../components/TimeLine/TimeLineCreate'
import './TimeLine.css'

function TimeLine() {
    return(
        <div className="TimeLine">
            <NavBar classNameName="TimeLineNav"/>
            <div className="TimeLineBox">
                < TimeLineCreate className="TimeLineCreate1" />
                <div></div>
            </div>
        </div>
    )
}

export default TimeLine;