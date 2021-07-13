import React from 'react'
import TimeLineListContent from './TimeLineListContent';
import TimeLineListImage from './TimeLineListImage';
import './TimeLineList.css'

function TimeLineList({item}){
    return(
        <div className = "TimeLineList">
            <TimeLineListImage props={item}/>
            <TimeLineListContent props={item}/>
        </div>
    )
}

export default TimeLineList;