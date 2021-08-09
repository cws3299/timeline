import React ,{ useEffect,useState } from 'react'
import './UserPageContent.css'
import { config } from '../../shared/config'
import axios from 'axios'

function UserPageContent(midx){
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    console.log('midxxx',midx)

    const noImage = 'https://lh3.googleusercontent.com/proxy/tPrxleMgUPdv4BT8Kn3tkuB8y5t-wr9-Fu8ZLgBz0MGriuOad0zg4eB83zADl2D0RLDLJDOF4gjCypk93Y2lftyqmbng9wkDQmuJug'
    let data = null
    const sendQuerys = async() => {
        console.log('-------')
        try{
            const res = await axios.get(`${url}/member/userpage?midx=${midx.midx}`, token)
            console.log('rr',res.data)
            // setData(res.data)
            // console.log('dataaa',data)
            data = res.data
            console.log('rrrr',data)
            
        }catch(err){
        }
    }

    useEffect(() => {
        sendQuerys();
        // return () => {
        //   stopTimer();
        // };
      });

    return(
        <div className="UserPageContent">
            <div className="UserInfo">
                <div className="UserInfo1">

                </div>
                <div>

                </div>
            </div>
            <div>

            </div>
        </div>
    )
};

export default UserPageContent