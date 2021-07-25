import React from 'react'
import './TimeLineCard'

function TimeLineCard({props}){
    return(
        <div className="TimeLineCard">
            {props.tlcategory}
        </div>
    )
}

export default TimeLineCard;