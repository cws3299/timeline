import React from'react';
import './Main.css';
import Timer from './Timer';
import ButtonBox from './ButtonBox';


function Main() {
    return(
        <div className ='Main'>
            <ButtonBox />
            <Timer />
        </div>
    );
}

export default Main;