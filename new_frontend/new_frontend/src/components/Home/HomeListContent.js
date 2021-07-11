import React from 'react';
import './HomeListContent.css'

function HomeListContent({props}) {
    return(
        <div className="HomeListContent">
            {props.tlccontent}
            {props.tlcplace}
        </div>
    )
}

export default HomeListContent;