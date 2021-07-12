import React,{useState,useEffect, useCallback} from 'react'
import NewNav from '../components/NewNav.js';
import FlipCard from '../components/TimeLine/FlipCard';
import TimeLineBooks from '../components/TimeLine/TimeLineBooks';
import AllProjects from '../components/TimeLine/AllProjects';
import TimeLineCarousel from '../components/TimeLine/TimeLineCarousel';
import './TimeLine.css'
import axios from "axios";
import { config } from '../shared/config'

function TimeLine() {
    const [timeline, setTimeline] = useState([])
    const url = config.api
    const _token = localStorage.getItem("token")
    let token = {
        headers: { Authorization: `Bearer ${_token}` },
    }

    const sendQuery = useCallback(async () => {
        try {
          const res = await axios.post(`${url}/timeline/list`,null,token)
          await setTimeline((prev) => [...prev, ...res.data]);
        } catch (err) {
            console.log(err)
        }
      }, []);
    
      useEffect(() => {
        sendQuery();
      }, []);


    return(
        <div className="TimeLine">
            <NewNav />
            <div className="TimeLineBox">
                <TimeLineCarousel data={timeline} />
            </div>
        </div>
    )
}

export default TimeLine;