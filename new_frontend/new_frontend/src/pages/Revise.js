import React from 'react'
import NewNav from '../components/NewNav';
import './Revise.css'
import ReviseContent from '../components/Revise/ReviseContent';
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';

function Revise() {
    return(
        <div className="PostBox1">
            <NewNav className = "PostBoxNewNav"/>
            <div className = "PostBox1Box">
                <div className = "PostBox1Box2">
                    <ReviseContent />
                </div>
            </div>
            < TimeLineCreateButton />
            < TimeCapsulebutton />
            < PostButton />
        </div>
    )
}

export default Revise;