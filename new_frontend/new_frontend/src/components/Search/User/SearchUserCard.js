import React from 'react'
import './SearchUserCard.css'

function SearchUserCard(props){
    console.log(props)
    return(
        <div className="SearchUserCard">
            {props.props.mid}
        </div>
    )
}

export default SearchUserCard;