import React from'react'
import './UserPageCard.css';

function UserPageCard(props){
    console.log(1111111,props)
    return(
        <div className="UserPageCard">
            {props.props.tlintroduce}
        </div>
    )
};

export default UserPageCard;