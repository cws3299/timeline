import React from 'react'
import './SearchTimelineCard.css'

function SearchTimelineCard(props){
    console.log(props)
    return(
        <div className="SearchTimelineCard">
            {props.props.mid}
        </div>
    )
}

export default SearchTimelineCard;