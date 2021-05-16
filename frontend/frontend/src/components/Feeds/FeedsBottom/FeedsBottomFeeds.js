import React, { useState, useEffect } from 'react'
import './FeedsBottomFeeds.css'
import FeedsBottomFeedsMiddle_ from './FeedsBottomFeedsMiddle_'
import TimeFormat from "hh-mm-ss";



function FeedsBottomFeeds() {

    const dates = new Date();
    let ms = dates.getMonth();
    let ds = dates.getDate();

    let mainTime;
    const secondsLeft = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const left = hours*(3600) + minutes*(60) + seconds
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
        const updatedSeconds = seconds+1;
        if (updatedSeconds > 1) {
            stopTimer();
        }
        return updatedSeconds;
        });
    };


    const display = TimeFormat.fromS(seconds, "hh:mm:ss");
    const [h, m, s] = display.split(":");

        
    if (ms === 0){
        ms = 'Jan'
    }else if(ms === 1){
        ms = 'Feb'
    }else if(ms === 2){
        ms = 'Mar'
    }else if(ms === 3){
        ms = 'Apr'
    }else if(ms === 4){
        console.log('======================')
        ms = 'May'
        console.log(ms)
    }else if(ms === 5){
        ms = 'Jun'
    }else if(ms === 6){
        ms = 'Jul'
    }else if(ms === 7){
        ms = 'Aug'
    }else if(ms === 8){
        ms = 'Sep'
    }else if(ms === 9){
        ms = 'Oct'
    }else if(ms === 10){
        ms = 'Nov'
    }else if(ms === 11){
        ms = 'Dec'
    }


    
    return (
        <div className="FeedsBottomFeeds">
            <div className="FeedsBottomFeedsTop">
                <div className="FeedsBottomFeedsTop1">
                    <div className="FeedsBottomFeedsTop1_">
                        <span style={{fontSize:'1.5rem' , color:'black', fontFamily: 'Roboto'}}>{h}: </span>
                        <span style={{fontSize:'1.5rem' , color:'black', fontFamily: 'Roboto'}}> {m}</span>
                    </div>
                    <div className="FeedsBottomFeedsTop1_2">
                        {/* <span>{month()}</span> */}
                        <span style={{fontSize:'1rem' , color:'black' , fontFamily: 'Roboto'}}>{ds}</span>
                        <span style={{fontSize:'1rem' , color:'black' , fontFamily: 'Roboto'}}>{ms}</span>
                    </div>
                </div>
            </div>
            <div className="FeedsBottomFeedsMiddle">
                <FeedsBottomFeedsMiddle_ />
            </div>
            {/* <div className="FeedsBottomFeedsBottom"></div> */}
        </div>
    )
}

export default FeedsBottomFeeds;