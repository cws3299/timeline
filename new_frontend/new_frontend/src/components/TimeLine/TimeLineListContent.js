import React from'react'
import './TimeLineListContent.css'
import { history } from "../../redux/configureStore";
import { actionCreators as timeActions } from "../../redux/modules/timelinefeed";
import { useSelector, useDispatch } from "react-redux";

function TimeLineListContent({props}) {
    const dispatch = useDispatch();
    const feedidx= (props) =>{
        console.log('123123',props.tlidx)
        dispatch(timeActions.settimeFeedSV(props.tlidx));
      }

    const goTimeLineFeed = () => {
        console.log('-----------------------',props.tlidx)
        feedidx(props)
        history.push({
            pathname: '/main/timelinefeed',
            props: {props}
          })
      } 

    return (
        <div className="TimeLineListContent">
            <div className="TimeLineListContentInfo1">
                {props.tltitle}
                {props.tlcategory}
            </div>
            <div className="TimeLineListContentInfo2">
                {props.tlintroduce}
            </div>
            <div className="TimeLineListContentInfo3">
                <button className = "TimeLineListButton" onClick={goTimeLineFeed}></button>
            </div>
        </div>
    )
}

export default TimeLineListContent;