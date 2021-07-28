import React from 'react'
import './TimeCapsuleCreate.css'
import TimeCapsuleCreateContent from '../components/TimeCapsuleCreate/TimeCapsuleCreateContent';
import NewNav from '../components/NewNav'

function TimeCapsuleCreate(){
    return(
        <div className = "TimeCapsuleCreate">
            <NewNav className = "TimeCapsuleCreateNewNav"/>
            <div className = "TimeCapsuleCreateBox">
                <div className = "TimeCapsuleCreateBox2">
                    <TimeCapsuleCreateContent />
                </div>
            </div>
        </div>
    )
}

export default TimeCapsuleCreate;