import React from'react'
import './TimeLineListContent.css'
import { history } from "../../redux/configureStore";
import { actionCreators as timeActions } from "../../redux/modules/timelinefeed";
import { useSelector, useDispatch } from "react-redux";

function TimeLineListContent({props}) {
    const dispatch = useDispatch();
    const feedidx= (props) =>{
        dispatch(timeActions.settimeFeedSV(props.tlidx));
      }

    const goTimeLineFeed = () => {
        feedidx(props)
        history.push({
            pathname: '/main/timelinefeed',
            props: {props}
          })
      } 

    return (
        <div className = 'TimeLineListContent'>
            <div className = "TimeLineListContentTitle">
                {props.tltitle}
            </div>
            <div className = "TimeLineListContentContent">
                <div className = "TimeLineListContentContent1">
                    {props.tlintroduce}
                </div>
                <button className = "TimeLineListContentContent2" onClick={goTimeLineFeed}>
                    타임라인으로 이동하기
                </button>
            </div>
        </div>
    )
}

export default TimeLineListContent;