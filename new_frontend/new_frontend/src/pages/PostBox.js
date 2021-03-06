import React from 'react'
import NewNav from '../components/NewNav';
import './PostBox.css'
import PostBoxChoice from '../components/PostBox/PostBoxChoice';
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';

function PostBox() {
    return(
        <div className="PostBox1">
            <NewNav className = "PostBoxNewNav"/>
            <div className = "PostBox1Box">
                <div className = "PostBox1Box2">
                    <PostBoxChoice />
                </div>
            </div>
            < TimeLineCreateButton />
            < TimeCapsulebutton />
            < PostButton />
        </div>
    )
}

export default PostBox;