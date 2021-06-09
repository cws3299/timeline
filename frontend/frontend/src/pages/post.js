import React from 'react';
import TopNavigator from '../components/Navigator/TopNavigator';
import SideNavigator from '../components/Navigator/SideNavigator';


function Post() {
    return (
        <div className="Post">
            <TopNavigator is_loginApp = {true} className='TopNavigator' nav={is_loginApp}></TopNavigator>
            <SideNavigator is_loginApp = {true} className='SideNavigator' nav={is_loginApp} />

            <div>post</div>
        </div>
    );
}



export default Post;