import React from'react'
import './PostButton.css'
import { history } from "../redux/configureStore";

function PostButton(){

    const goPost = () => {
      history.push({
          pathname: '/main/post',
        })
    } 

    return(
      <div className = "PostButton" onClick={goPost}>
        글 작성
        {/* <i class="fas fa-plus"></i> */}
      </div>
    )
}

export default PostButton;