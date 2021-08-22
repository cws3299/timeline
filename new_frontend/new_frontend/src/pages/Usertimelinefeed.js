import React from'react'
import NewNav from '../components/NewNav';
import './Usertimelinefeed.css' 
import { useSelector, useDispatch } from "react-redux";
import UsertimelinefeedList from '../components/UserTimelineFeed/UsertimelinefeedList.js';
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';

function Usertimelinefeed(){
    const tlidxx = useSelector(state => state.Usertimelinefeed.userfeed);
    console.log('--------------12',tlidxx)
    return(
        <div className="Usertimelinefeed">
            <NewNav className = "UsertimelinefeedNewNav"/>
            <div className = "Usertimelinefeed1Box">
                <div className = "Usertimelinefeed1Box2" >
                    < UsertimelinefeedList />
                </div>
            </div>
            < TimeLineCreateButton />
            < TimeCapsulebutton />
            < PostButton />
        </div>
    )
};

export default Usertimelinefeed;