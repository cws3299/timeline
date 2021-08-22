import React from 'react'
import NewNav from '../components/NewNav';
import './FollowTimeline.css'
// import PostBoxChoice from '../components/PostBox/PostBoxChoice';
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';
import FollowTimelineList from '../components/FollowTimeline/FollowTimelineList';

function FollowTimeline() {
    return(
        <div className="FollowTimeline1">
            <NewNav className = "PostBoxNewNav"/>
            <div className = "FollowTimelineBox">
                <div className = "FollowTimeline2">
                    <FollowTimelineList />
                </div>
            </div>
            < TimeLineCreateButton />
            < TimeCapsulebutton />
            < PostButton />
        </div>
    )
}

export default FollowTimeline;