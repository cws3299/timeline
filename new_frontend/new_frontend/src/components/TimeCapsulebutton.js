import React from'react'
import './TimeCapsulebutton.css'
import { history } from "../redux/configureStore";

function TimeCapsulebutton(){

    const goPost = () => {
      history.push({
          pathname: '/main/TimeCapsuleCreate',
        })
    } 

    return(
      <div className = "TimeCapsulebutton" onClick={goPost}>
        타임캡슐
      </div>
    )
}

export default TimeCapsulebutton;