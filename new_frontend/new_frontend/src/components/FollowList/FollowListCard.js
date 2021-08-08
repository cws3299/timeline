import React , {useState} from 'react'
import './FollowListCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LinesEllipsis from 'react-lines-ellipsis'
import { config } from '../../shared/config'
import { history } from "../../redux/configureStore"
import { actionCreators as timeActions } from "../../redux/modules/timelinefeed";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function FollowListCard({props}){
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

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

    const goTimeLineUnfollow = () =>{
        try{
            const res = axios.get(`${url}/follow/followtl/cancel?tlidx=${props.tlidx}`,token)
            history.go(0)
        }catch(err){
            console.log(err)
        }

    }

    console.log(props.tlcimage)
    if (props.mphoto === null){
        return(
            <div className="FollowListCard1">
                <div className="FollowListCardImg1">

                </div>
                <div className="FollowListCardContent1">
                    {props.tlidx}
                    <button onClick={goTimeLineFeed}>타임라인으로 이동하기</button>
                    <button onClick={goTimeLineUnfollow}>타임라인 팔로우 취소하기</button>
                </div>
            </div>
        )
    }else{
        return(
            <div className="FollowListCard">
                <div className="FollowListCardImg">

                </div>
                <div className="FollowListCardContent">
                    {props.tlidx}
                    <button onClick={goTimeLineFeed}>타임라인으로 이동하기</button>
                    <button onClick={goTimeLineUnfollow}>타임라인 팔로우 취소하기</button>
                </div>
            </div>
        )
    }
}

export default FollowListCard;