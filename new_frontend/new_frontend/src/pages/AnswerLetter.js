import React from 'react'
import {useLocation} from "react-router";
import NewNav from '../components/NewNav';
import './AnswerLetter.css'
import AnswerLetterContent from '../components/AnswerLetter/AnswerLetterContent';

function AnswerLetter(){
    const location = useLocation();
    const lidx = location.state.lidx;
    console.log('------',lidx)
    return(
        <div className = "AnswerLetter">
            <NewNav className = "AnswerLetterNav"/>
            <div className = "AnswerLetterBox">
                <div className = "AnswerLetterBox2">
                    <AnswerLetterContent props={lidx}/>
                </div>
            </div>
        </div>
    )
};

export default AnswerLetter;