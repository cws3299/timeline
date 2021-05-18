import React from 'react'
import './FeedsTop.css'
import FeedsTopLeft from './FeedsTopLeft'
import FeedsTopMiddle from './FeedsTopMiddle'
import FeedsTopRight from './FeedsTopRight'

function FeedsTop() {
    return (
        <div className = "FeedsTop">
            < FeedsTopLeft />
            < FeedsTopMiddle />
            < FeedsTopRight />
        </div>
    )
};

export default FeedsTop;