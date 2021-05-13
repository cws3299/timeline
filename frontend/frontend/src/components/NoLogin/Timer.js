import React, { useState, useEffect } from "react";
import TimeFormat from "hh-mm-ss";
import './Timer.css'

const Timer = () => {
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
    <div className ='Timer'>
      <div
        className="flex flex-column justify-center items-center"
        style={{ height: "100%" }}
      >
        <h1 className="flex flex-column">당신의 오늘 하루</h1>

        <div className="flex ">
          <div className="flex flex-column" style={{ marginRight: "20px" }}>
            <h1>{h}
                <span className="word">시간</span>
            </h1>
          </div>
          <div className="flex flex-column" style={{ marginRight: "20px" }}>
            <h1>{m}
                <span className="word">분</span>
            </h1>
          </div>
          <div className="flex flex-column">
            <h1>{s}
                <span className="word">초</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timer;