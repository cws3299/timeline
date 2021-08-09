import React from 'react'
import './SearchUserCard.css'
import { history } from "../../../redux/configureStore"

function SearchUserCard(props){
    console.log(props)
    console.log('pp]]',props.props)

    const goUser = () => {
        history.push({
            pathname: "/main/UserPage",
            state: {midx: props.props.midx}
          })
      }

    if(props.props.mphoto === null){
        return(
            <div className="SearchUserCard" onClick={goUser}>
                <div className="SearchUserCard1">
                    <div className="SearchUserCard11">
                        <img src="https://lh3.googleusercontent.com/proxy/tPrxleMgUPdv4BT8Kn3tkuB8y5t-wr9-Fu8ZLgBz0MGriuOad0zg4eB83zADl2D0RLDLJDOF4gjCypk93Y2lftyqmbng9wkDQmuJug" className="SearchUserCard1Avatar"></img>
                        <div className="SearchUserCard1Name">
                            {props.props.mnickname}
                        </div>
                    </div>
                    <div className="SearchUserCard12">
                        <div className="SearchUserCard1NameIntroduce">
                            {props.props.mproduce}
                        </div>
                    </div>
                </div>      
            </div>
        )
    }else{
        return(
            <div className="SearchUserCard" onClick={goUser}>
                <div className="SearchUserCard1">
                    <div className="SearchUserCard11">
                        <img src="http://www.anewsa.com/news_images/2020/12/15/mark/20201215124644.jpg" className="SearchUserCard1Avatar"></img>
                        <div className="SearchUserCard1Name">
                            {props.props.mnickname}
                        </div>
                    </div>
                    <div className="SearchUserCard12">
                        <div className="SearchUserCard1NameIntroduce">
                            {props.props.mproduce}
                        </div>
                    </div>
                </div>      
            </div>
        )
    }
}

export default SearchUserCard;