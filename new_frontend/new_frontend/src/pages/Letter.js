import React from 'react'
import {useLocation} from "react-router";
import NewNav from '../components/NewNav';
import './Letter.css'
import LetterContent from '../components/Letter/LetterContent';

function Letter(){
    const location = useLocation();
    const tlcidx = location.state.tlcidx;
    return(
        <div className = "Letter">
            <NewNav className = "LetterNav"/>
            <div className = "LetterBox">
                <div className = "LetterBox2">
                    <LetterContent props={tlcidx}/>
                </div>
            </div>
        </div>
    )
};

export default Letter