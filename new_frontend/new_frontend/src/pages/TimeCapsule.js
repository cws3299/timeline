import React ,{ useState, useEffect, useCallback } from 'react'
import NewNav from '../components/NewNav.js';
import TimeCapsuleList from '../components/TimeCapsule/TimeCapsuleList';
import './TimeCapsule.css'

function TimeCapsule() {
    return(
        <div className="TimeCapsule">
            <NewNav className="TimeCapsuleNewNav" />
            <div className = "TimeCapsuleBox">
                <TimeCapsuleList />
            </div>
        </div>
    )
}

export default TimeCapsule;