import React, { useState, useEffect } from "react";
import TimeFormat from "hh-mm-ss";
import './IntroTimer.css'

const IntroTimer = () => {
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
  return (
    <div className ='IntroTimer'>
      <div
        className="IntroBox"
        style={{ height: "100%" }}
      >
        <h1 className="IntroBoxString" style={{ color:'black'}}>당신의 하루를 기록하세요</h1>

        <div className="IntroBoxTime">
            <div> {h} : {m} : {s} </div>
        </div>

      </div>
    </div>
  );
};
export default IntroTimer;