import React from 'react'
import './SendLetter.css'
import NewNav from '../components/NewNav';
import SendLetterContent from '../components/SendLetter/SendLetterContent';

function SendLetter() {

    return(
        <div className = "SendLetter">
        <NewNav className = "SendLetterNav"/>
        <div className = "SendLetterBox">
            <div className = "SendLetterBox2">
                <SendLetterContent/>
            </div>
        </div>
    </div>
    )
}

export default SendLetter;