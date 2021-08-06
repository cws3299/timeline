import React from 'react'
import NewNav from '../components/NewNav';
import './StartFeed.css'
import {useLocation} from "react-router";
import StartFeedContent from '../components/StartFeed/StartFeedContent';

function StartFeed() {
    const location = useLocation();
    const feed = location.state.feed; 

    console.log('tlcidx',feed)
    return(
        <div className="StartFeed">
            <NewNav className = "StartFeedNewNav"/>
            <div className = "StartFeedBox">
                <div className = "StartFeedBox2">
                    <StartFeedContent />
                </div>
            </div>
        </div>
    )
}

export default StartFeed;