import React from 'react'
import './SearchPostCard.css'

function SearchPostCard(props){
    console.log(props)
    return(
        <div className="SearchPostCard">
            {props.props.mid}
        </div>
    )
}

export default SearchPostCard;