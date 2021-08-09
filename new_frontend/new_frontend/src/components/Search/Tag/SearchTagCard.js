import React from 'react'
import './SearchTagCard.css'

function SearchTagCard(props){
    console.log(props)
    return(
        <div className="SearchTagCard">
            {props.props.mid}
        </div>
    )
}

export default SearchTagCard;