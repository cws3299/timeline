import React from'react'
import './UserPageCard.css';
import { history } from "../../redux/configureStore";
import { actionCreators as usertimeActions } from "../../redux/modules/usertimelinefeed";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { config } from '../../shared/config'

function UserPageCard(props){
    const dispatch = useDispatch();
    console.log(1111111,props)
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };
    const feedidx= (idx) =>{
        dispatch(usertimeActions.usersettimeFeedSV(idx));
      } 

    const onClick = async() =>{
        console.log('pppppppppppppppppppppppppppp',props.props)
        await feedidx(props.props.tlidx)
        history.push({
            pathname: '/main/usertimelinefeed',
          })
    }

    const Follow = async() =>{
        console.log('follow',props.props.tlidx)
        try{
            const res = await axios.get(`${url}/follow/followtl?tlidx=${props.props.tlidx}` , token)
            console.log('팔로우 완료')
            alert('선택한 타임라인이 팔로우 되셨습니다')
            console.log('pppppppppppppppppppppppppppp',props.props)
            await feedidx(props.props.tlidx)
            history.push({
                pathname: '/main/usertimelinefeed',
              })
        }catch(err){

        }


    }

    return(
        <div className="UserPageCard" >
            <div className="UserPageCardBox1">
                {props.props.tlintroduce}
            </div>
            <div className="UserPageCardBox">
                <div className="UserPageCard1" onClick={onClick}>
                    타임라인으로 이동
                </div>
                <div className="UserPageCard2" onClick={Follow}>
                    타임라인 팔로우
                </div>
            </div>
        </div>
    )
};

export default UserPageCard;