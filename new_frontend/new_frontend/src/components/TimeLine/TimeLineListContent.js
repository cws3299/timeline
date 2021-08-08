import React from'react'
import './TimeLineListContent.css'
import { history } from "../../redux/configureStore";
import { actionCreators as timeActions } from "../../redux/modules/timelinefeed";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { config } from '../../shared/config'

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

    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
    headers: { Authorization: `Bearer ${_token}` },
    };

    const removeTl = () =>{
        try{
            let returnValue = window.confirm('정말 삭제하시겠습니까?');
            if (returnValue === true){
                console.log(returnValue)
                const res = axios.post(`${url}/timeline/deletetime/${props.tlidx}`,null,token)
            }else{
                console.log(returnValue)
            }
        }catch(err){
            console.log(err)
        }
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
                <div className = "TimeLineListContentContent2" >
                    <div className = "TimeLineListContentContent2_1" onClick={goTimeLineFeed}>
                        타임라인으로 이동하기
                    </div>
                    <div className = "TimeLineListContentContent2_2" onClick={removeTl}>
                        타임라인 제거하기
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default TimeLineListContent;