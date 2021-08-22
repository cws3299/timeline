import React from 'react';
import Home2List from '../components/Home2/Home2List';
import NewNav from '../components/NewNav.js';
import './Home2.css'
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';

function Home2() {
    return (
        <div className="Home2">
            <NewNav className="Home2NewNav"/>
            <div className='Home2Box'>
                <Home2List/>
            </div>
            < TimeLineCreateButton />
            < TimeCapsulebutton />
            < PostButton />
        </div>
    );
}

export default Home2;