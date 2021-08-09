import React from 'react'
import './UserPage.css'
import NewNav from '../components/NewNav';
import {useLocation} from "react-router";
import UserPageContent from '../components/UserPage/UserPageContent';

function UserPage() {
    const location = useLocation();
    const midx = location.state.midx;  
    console.log('midx',midx)
    return(
        <div className="UserPageBox1">
            <NewNav className = "PostBoxNewNav"/>
            <div className = "UserPageBox1Box">
                <div className = "UserPageBox1Box2">
                    <UserPageContent midx={midx} />
                </div>
            </div>
        </div>
    )
}

export default UserPage;