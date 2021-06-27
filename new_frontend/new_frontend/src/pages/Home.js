import React from 'react'
import NavBar from '../components/NavBar'
import './Home.css'
import HomeList from '../components/Home/HomeList'
import HomeFeed from '../components/Home/HomeFeed'


function Home() {
    return(
        <div className="Home">
            <NavBar calssName="HomeNavBar"/>
            <div className="HomeBox">
                <HomeList className="HomeList1" />
                <HomeFeed className="HomeFeed1"/>   
            </div> 
        </div>
    )
}

export default Home;