import React from 'react'
import NavBar from '../components/NavBar'
import './Home.css'
import HomeList from '../components/Home/HomeList'


function Home() {
    return(
        <div className="Home">
            <NavBar calssName="HomeNavBar"/>
            <div className="HomeBox">
                <HomeList />
                <div>
                    
                </div>   
            </div> 
        </div>
    )
}

export default Home;