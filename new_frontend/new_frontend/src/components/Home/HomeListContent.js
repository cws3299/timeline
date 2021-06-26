import React from 'react';
import './HomeListContent.css'

function HomeListContent({props}) {
    return(
        <div className="HomeListContent">
            {props.tlcidx}
        </div>
    )
}

export default HomeListContent;