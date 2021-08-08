import React from 'react'
import NewNav from '../components/NewNav';
import FollowListContent from '../components/FollowList/FollowListContent';
import './FollowList.css'

function FollowList() {
    return(
        <div className="FollowList">
            <NewNav className = "FollowListNewNav"/>
            <div className = "FollowListBox">
                <div className = "FollowListBox2">
                    <FollowListContent/>
                </div>
            </div>
        </div>
    )
}

export default FollowList;