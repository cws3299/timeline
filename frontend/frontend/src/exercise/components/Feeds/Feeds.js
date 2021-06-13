import React from 'react'
import './Feeds.css'
import FeedsTop from './FeedsTop/FeedsTop'
import FeedsBottom from './FeedsBottom/FeedsBottom'


function Feeds() {
    return (
        <div className = "Feeds">
            <FeedsTop />
            <FeedsBottom/>
        </div>
    )
};

export default Feeds;