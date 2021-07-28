import React, { useState, useEffect } from 'react';
import TimeFormat from "hh-mm-ss";
import './TimeCapsuleTimer.css'

const TimeCapsuleTimer = ({props}) => {

    // Day도 인터벌 만들기?
    const setDate = new Date(props.tcterm)

    const now = new Date()

    const distance = setDate.getTime() - now.getTime() - 32400000;

    const dday = Math.floor(distance/(1000*60*60*24));
    

    let mainTime;
    const secondsLeft = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const left = (23 - hours) * 3600 + (60 - minutes) * 60 + (60 - seconds);
        return left;
    };

    const [seconds, setSeconds] = useState(secondsLeft());
    useEffect(() => {
      startTime();
      return () => {
        stopTimer();
      };
    });
  
    const startTime = () => {
      if (seconds && seconds > 0) {
        mainTime = setInterval(tick, 1000);
      }
    };
  
    const stopTimer = () => {
      clearInterval(mainTime);
    };
  
    const tick = () => {
      setSeconds(seconds => {
        const updatedSeconds = seconds - 1;
        if (updatedSeconds < 1) {
          stopTimer();
        }
        return updatedSeconds;
      });
    };
    
  const display = TimeFormat.fromS(seconds, "hh:mm:ss");
  const [h, m, s] = display.split(":");
    if (dday >0) {
        return(
        <div className ='TimeCapsuleTimer'>
            <div
              className="TimeCapsuleTimerBox"
              style={{ height: "100%" }}
            >
      
              <div className="TimeCapsuleTimerBoxTime">
                  <div className="TimeCapsuleTimerBoxTimeDay"> {dday} Day</div>
                  <div className="TimeCapsuleTimerBoxTimeHour"> {h} : {m} : {s} </div>
              </div>
      
            </div>
          </div>
        )
    }else if(dday==0){
        return (
          <div className ='TimeCapsuleTimer'>
            <div
              className="TimeCapsuleTimerBox"
              style={{ height: "100%" }}
            >
      
              <div className="TimeCapsuleTimerBoxTime2">
                <div> {h} : {m} : {s} </div>
              </div>
      
            </div>
          </div>
        );
    }else{
      return (
        <div className ='TimeCapsuleTimer'>
          열람가능
        </div>
      );
    }

  };

export default TimeCapsuleTimer;