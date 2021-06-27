import React, {useEffect,useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import './HomeFeed.css'

function HomeFeed() {
    const todos = useSelector(state => state.home.homefeed);
    console.log('12312321321321321321321123123123123112312',todos)
    
    useEffect(()=>{
        console.log('1')
        console.log(todos)
        return () =>{
            console.log('2')
            console.log(todos)
        };
    },[])
    
    return(
        <div className="HomeFeedBox">
            <div className = "HomeFeed">
                {todos.tlccontent}
            </div>
        </div>
    )
}

export default HomeFeed;