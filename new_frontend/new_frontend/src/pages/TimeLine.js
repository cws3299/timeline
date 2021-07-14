import React ,{ useState, useEffect, useCallback } from 'react'
import Carousel from '../components/TimeLine/carousel'
import TimeLineList from '../components/TimeLine/TimeLineList'
import NewNav from '../components/NewNav.js';
import './TimeLine.css'
import axios from "axios";
import { config } from '../shared/config'

function TimeLine() {
    const [timeline,setTimeline] = useState([])
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    const sendQuery = useCallback(async () => {
        try {
          const res = await axios.post(`${url}/timeline/list`,null,token)
          console.log('res',res)
          await setTimeline((prev) => [...prev, ...res.data]);
        //   console.log('u',list)
        } catch (err) {
            console.log(err)
        }
      }, []);
    
      useEffect(() => {
        sendQuery();
      }, []);

    return(
        <div className="TimeLine">
            <NewNav className="TimeLineNewNav"/>
            <div className='TimeLineBox'>
                <div className='TimeLineBox2'>
                    {/* <Carousel timeline={timeline}/> */}
                    {timeline.map((item, i) => (
                      <TimeLineList key={i} item={item}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TimeLine;