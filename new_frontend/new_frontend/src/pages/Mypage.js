import React from 'react'
import NewNav from '../components/NewNav';
import './Mypage.css'
// import PostBoxChoice from '../components/PostBox/PostBoxChoice';

function Mypage() {
    return(
        <div className="MypageBox1">
            <NewNav className = "MypageNewNav"/>
            <div className = "Mypage1Box">
                <div className = "Mypage1Box2">
                    {/* <PostBoxChoice /> */}
                </div>
            </div>
        </div>
    )
}

export default Mypage;