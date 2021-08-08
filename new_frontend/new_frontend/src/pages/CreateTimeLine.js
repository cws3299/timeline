import React from 'react';
import CreateTimeLineContent from '../components/CreateTimeLine/CreateTimeLineContent';
import NewNav from '../components/NewNav.js';
import './CreateTimeLine.css'


function CreateTimeLine() {
    return (
        <div className="CreateTimeLine">
            <NewNav className="CreateTimeLineNewNav"/>
            <div className='CreateTimeLineBox'>
                <div className = "CreateTimeLineBox2">
                    <CreateTimeLineContent/>
                </div>
            </div>
        </div>
    );
}

export default CreateTimeLine;