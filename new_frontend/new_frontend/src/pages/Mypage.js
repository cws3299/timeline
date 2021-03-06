import React from 'react'
import NewNav from '../components/NewNav';
import './Mypage.css'
import MypageContents from '../components/Mypage/MypageContents';
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';
import ReviseButton from '../components/ReviseButton';


function Mypage() {
    return(
        <div className="MypageBox1">
            <NewNav className = "MypageNewNav"/>
            <div className = "Mypage1Box">
                <div className = "Mypage1Box2">
                    < MypageContents />
                </div>
            </div>
            < ReviseButton />
            < TimeLineCreateButton />
            < TimeCapsulebutton />
            < PostButton />
        </div>
    )
}

export default Mypage;