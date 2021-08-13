import React from 'react'
import NewNav from '../components/NewNav';
import './Mypage.css'
import MypageContents from '../components/Mypage/MypageContents';

function Mypage() {
    return(
        <div className="MypageBox1">
            <NewNav className = "MypageNewNav"/>
            <div className = "Mypage1Box">
                <div className = "Mypage1Box2">
                    < MypageContents />
                </div>
            </div>
        </div>
    )
}

export default Mypage;