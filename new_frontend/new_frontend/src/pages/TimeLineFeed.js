import React,{useState,useMemo, useEffect} from 'react'
import {useLocation} from "react-router";
import NewNav from '../components/NewNav.js';
import TimeLineFeedList from '../components/TimeLineFeed/TimeLineFeedList.js';
import './TimeLineFeed.css'
import { actionCreators as timeActions } from "../redux/modules/timelinefeed";
import { useSelector, useDispatch } from "react-redux";
// import {useLocation} from "react-router";
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';

function TimeLineFeed() {
    // const dispatch = useDispatch();
    const tlidxx = useSelector(state => state.timelinefeed.homefeed);
    console.log('--------------12',tlidxx)
    // const location = useLocation();
    // const tlidxxx = location.state.tlidx; 
    // console.log(location.state)
    // const location = useLocation();
    // const item = location.props;
    // const [item2,setItem2] = useState(item)
    // const feedidx= () =>{
    //     dispatch(timeActions.settimeFeedSV(item2.props.tlidx));
    //   }

    // useEffect(()=>{
    //     feedidx()
    //     return () =>{
    //     };
    // },[])

    return(
        <div className="TimeLineFeed">
            <NewNav className="TimeLineFeedNewNav"/>
            <div className='TimeLineFeedBox'>
                <TimeLineFeedList tlidxx={tlidxx}/>
            </div>
            < TimeLineCreateButton />
            < TimeCapsulebutton />
            < PostButton />
        </div>
    )
}

export default TimeLineFeed;