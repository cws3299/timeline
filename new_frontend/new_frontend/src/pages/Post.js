import React from 'react'
import NewNav from '../components/NewNav';
import PostContent from '../components/Post/PostContent';
import './Post.css'

function Post() {
    return(
        <div className="Post">
            <NewNav className = "PostNewNav"/>
            <div className = "PostBox">
                <div className = "PostBox2">
                    <PostContent />
                </div>
            </div>
        </div>
    )
}

export default Post;