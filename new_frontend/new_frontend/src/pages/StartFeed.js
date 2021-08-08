import React ,{useState, useEffect} from 'react'
import NewNav from '../components/NewNav';
import './StartFeed.css'
import {useLocation} from "react-router";
import StartFeedContent from '../components/StartFeed/StartFeedContent';
import axios from "axios";
import { config } from '../shared/config'

function StartFeed() {
    const location = useLocation();
    const data = location.state.data; 
    console.log('dddddd',data)
    // const url = config.api
    // const _token = localStorage.getItem("token");
    // let token = {
    //   headers: { Authorization: `Bearer ${_token}` },
    // };

    // const [data , setData] = useState(null)
    // console.log('feed',feed)
    // const sendQuerys = async() => {
    //     console.log('-------')
    //     try{
    //         const res = await axios.post(`${url}/post/detail/${feed}`,null, token)
    //         console.log(res)
    //         setData(res.data)
    //         console.log('dataaa',data)
            
    //     }catch(err){
    //     }
    // }

    // useEffect(()=>{
    //     sendQuerys()
    // },[])
    return(
        <div className="StartFeed">
            <NewNav className = "StartFeedNewNav"/>
            <div className = "StartFeedBox">
                <div className = "StartFeedBox2">
                    <StartFeedContent data={data}/>
                </div>
            </div>
        </div>
    )
}

export default StartFeed;