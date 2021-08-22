import React from 'react'
import './ReceiveLetter.css'
import NewNav from '../components/NewNav';
import ReceiveLetterContent from '../components/ReceiveLetter/ReceiveLetterContent';
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';

function ReceiveLetter() {

    return(
        <div className = "ReceiveLetter">
            <NewNav className = "ReceiveLetterNav"/>
            <div className = "ReceiveLetterBox">
                <div className = "ReceiveLetterBox2">
                    <ReceiveLetterContent/>
                </div>
            </div>
            < TimeLineCreateButton />
            < TimeCapsulebutton />
            < PostButton />
        </div>
    )
}

export default ReceiveLetter;