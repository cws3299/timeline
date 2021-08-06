import React from 'react'
import './PostBoxChoice.css'
import PostBoxChoiceLeft from './PostBoxChoiceLeft'
import PostBoxChoiceRight from './PostBoxChoiceRight'

function PostBoxChoice() {
    return (
        <div className = "PostBoxChoice">
            <div className="PostBoxChoice1">
                <PostBoxChoiceLeft />
            </div>
            <div className="PostBoxChoice2">
                <PostBoxChoiceRight />
            </div>
        </div>
    )
}

export default PostBoxChoice