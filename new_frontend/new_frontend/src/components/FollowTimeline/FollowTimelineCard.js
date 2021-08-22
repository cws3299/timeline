import React from 'react';
import './FollowTimelineCard.css'
import { history } from "../../redux/configureStore";
import { actionCreators as usertimeActions } from "../../redux/modules/usertimelinefeed";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { config } from '../../shared/config'

function FollowTimelineCard(props) {
    console.log(props)
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };
    const dispatch = useDispatch();
    const feedidx= (idx) =>{
        dispatch(usertimeActions.usersettimeFeedSV(idx));
      } 
    

    const onMove = async() =>{
        console.log('pppppppppppppppppppppppppppp',props.props)
        await feedidx(props.props.tlidx)
        history.push({
            pathname: '/main/usertimelinefeed',
          })
    }

    const goMypage = () => {
        history.push({
            pathname: '/main/mypage',
          })
    }


    const unFollow = async() =>{
        try{
            console.log(props.props.tlidx)
            const res = await axios.get(`${url}/follow/followtl/cancel?tlidx=${props.props.tlidx}`, token)
            alert("팔로우가 취소 되었습니다.")
            goMypage()
        }catch(err){
            alert("에러")
        }
    }

    return (
        <div className="FollowTL">
            <div className="FollowTLBox1">
                {props.props.tlintroduce}
            </div>
            <div className="FollowTLBox">
                <div className="FollowTLCard1" onClick={onMove}>
                    타임라인으로 이동
                </div>
                <div className="FollowTLCard2" onClick={unFollow}>
                    팔로우 취소하기
                </div>
            </div>
        </div>
    )
}

export default FollowTimelineCard;