import React from 'react'
import './SendLetter.css'
import NewNav from '../components/NewNav';
import SendLetterContent from '../components/SendLetter/SendLetterContent';
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';

function SendLetter() {

    return(
        <div className = "SendLetter">
        <NewNav className = "SendLetterNav"/>
        <div className = "SendLetterBox">
            <div className = "SendLetterBox2">
                <SendLetterContent/>
            </div>
        </div>
        < TimeLineCreateButton />
        < TimeCapsulebutton />
        < PostButton />
    </div>
    )
}

export default SendLetter;