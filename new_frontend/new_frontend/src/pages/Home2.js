import React from 'react';
import Home2List from '../components/Home2/Home2List';
import NewNav from '../components/NewNav.js';
import './Home2.css'


function Home2() {
    return (
        <div className="Home2">
            <NewNav className="Home2NewNav"/>
            <div className='Home2Box'>
                <Home2List/>
            </div>
        </div>
    );
}

export default Home2;