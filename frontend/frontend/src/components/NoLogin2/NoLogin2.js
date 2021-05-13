import React from 'react';
import './NoLogin2.css'
import NoLogin2Input from './NoLogin2Input'
import NoLogin2Input2 from './NoLogin2Input2'

function NoLogin2() {
  return (
    
    <div className="NoLogin2">
        <div className="NoLogin2Top">

        </div>
        <div className="NoLogin2Bottom">
            <div className="NoLogin2Bottom1">
                당신의 오늘을 잊지 마세요.
            </div>
            <div className="NoLogin2Bottom2">
                <NoLogin2Input placeholder="No icon"/>
                <NoLogin2Input2 placeholder="No icon" />
            </div>
            <div className="NoLogin2Bottom3"></div>
            <div className="NoLogin2Bottom4"></div>
        </div>
    </div>
  );
}

export default NoLogin2;