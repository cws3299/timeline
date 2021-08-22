import React, { useState, useEffect } from 'react'
import './MypageContent.css'
import { config } from '../../shared/config'
import axios from 'axios'
import MypageTimeline from './MypageTimeline'
import MypagePost from './MypagePost'
import MypageTimeCapsule from './MypageTimeCapsule'
import { history } from "../../redux/configureStore"

function MypageContents(){
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };
    const [data, setData] = useState({})
    const [followDto , setFollowDto] = useState({})
    const [Image, setImage] = useState("https://lh3.googleusercontent.com/proxy/tPrxleMgUPdv4BT8Kn3tkuB8y5t-wr9-Fu8ZLgBz0MGriuOad0zg4eB83zADl2D0RLDLJDOF4gjCypk93Y2lftyqmbng9wkDQmuJug")
    const sendQuerys = async() => {
        try{
            const res = await axios.get(`${url}/member/mypage`, token)
            if (res.data.mphoto !== null){
                setImage("data:image/jpeg;base64,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")
            }
            setData(res.data)
            setFollowDto(res.data.followDto)
            // console.log('------',followDto,res.data)
        }catch(err){
        }
    }

    const goTimeline = () =>{
        history.push({
            pathname:"/main/timeline"
        })
    }
    const goFollowTimeline = () =>{
        history.push({
            pathname:"/main/FollowTimeline"
        })
    }
    // const goPostboxx = () =>{
    //     console.log('+++++++++++++++++++++++++++++++')
    //     history.push({
    //         pathname:"/main/postbox"
    //     })
    // }

    useEffect(()=>{
        sendQuerys()
    })

    return(
        <div className="UserPageContent">
            <div className="UserInfo">
                <div className="UserInfo1">
                    <img src={Image} className="UserPageAvatar"></img>
                    <div className="UserPageName">
                        {data.mnickname}
                    </div>
                </div>
                <div className="userInfo2">
                    {data.mproduce}
                </div>
                <div className="userInfo3">
                    <div className="userInfo31">
                        팔로워
                    </div>
                    <div className="userInfo32">
                        {followDto.tlFollow}
                    </div>
                </div>
            </div>
            <div className="uuserBox">
                <div className="uuserBox1">
                    < MypageTimeline onClick={goTimeline} />
                </div>
                {/* <div className="userBox2">
                    < MypagePost onClick={goPostboxx} />
                </div> */}
                <div className="uuserBox3">
                    < MypageTimeCapsule onClick={goFollowTimeline} />
                </div>
            </div>

        </div>
    )
};

export default MypageContents;