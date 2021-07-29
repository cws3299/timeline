import React from 'react'
import NewNav from '../components/NewNav';
import './PostBox.css'
import PostBoxChoice from '../components/PostBox/PostBoxChoice';

function PostBox() {
    return(
        <div className="PostBox1">
            <NewNav className = "PostBoxNewNav"/>
            <div className = "PostBox1Box">
                <div className = "PostBox1Box2">
                    <PostBoxChoice />
                </div>
            </div>
        </div>
    )
}

export default PostBox;