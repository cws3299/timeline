import React ,{ useState, useEffect, useCallback } from 'react'
import NewNav from '../components/NewNav.js';
import TimeCapsuleList from '../components/TimeCapsule/TimeCapsuleList';
import './TimeCapsule.css'
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';

function TimeCapsule() {
    return(
        <div className="TimeCapsule">
            <NewNav className="TimeCapsuleNewNav" />
            <div className = "TimeCapsuleBox">
                <TimeCapsuleList />
            </div>
            < TimeLineCreateButton />
            < TimeCapsulebutton />
            < PostButton />
        </div>
    )
}

export default TimeCapsule;