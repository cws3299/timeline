import React from 'react';
import TopNavigator from '../components/Navigator/TopNavigator';
import SideNavigator from '../components/Navigator/SideNavigator';
import './Post.css'


function Post() {
    return (
        <div className="Post">
            <div className="PostTop">
                <TopNavigator  className='TopNavigator' />
            </div>
            <div className="PostBottom">
                <SideNavigator  className='SideNavigator' />
            </div>
        </div>
    );
}



export default Post;