import React, {useEffect,useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import './HomeFeed.css'

function HomeFeed() {
    const todos = useSelector(state => state.home.homefeed);
    console.log('11111111111111111111111111')
    
    useEffect(()=>{
        console.log('22222222222')
        console.log(todos)
        return () =>{
            console.log('3333333333333333333333333')
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