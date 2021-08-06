import React from 'react'
import './ReceiveLetter.css'
import NewNav from '../components/NewNav';
import ReceiveLetterContent from '../components/ReceiveLetter/ReceiveLetterContent';

function ReceiveLetter() {

    return(
        <div className = "ReceiveLetter">
        <NewNav className = "ReceiveLetterNav"/>
        <div className = "ReceiveLetterBox">
            <div className = "ReceiveLetterBox2">
                <ReceiveLetterContent/>
            </div>
        </div>
    </div>
    )
}

export default ReceiveLetter;