import React from 'react';
// import styled from 'styled-compnents';
// 네비게이션
// 페이지
import {
    Login,
    NotFound,
    Intro2,
    Post,
  } from "../pages/index";
// import TopNavigator from '../components/Navigator/TopNavigator';
// import SideNavigator from '../components/Navigator/SideNavigator';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import PrivateRoute from "./PrivateRoute";
import IntroPrivateRoute from "./IntroPrivateRoute";
import { red } from '@material-ui/core/colors';
// import Footer from "../components/Footer";
// import OAuth2RedirectHandler from "./OAuth2RedirectHandler";

function App() {
  const statusApp = localStorage.getItem("token");
  localStorage.getItem('token')
  const is_loginApp = statusApp === null ? false : true;
  console.log(is_loginApp,'========================')

  // const topNav = {
  //   height:'100%',
  //   width:'10%',
  //   background:'green',
  //   color:"red",
  // };


  return (
    <div className="App">
      <ConnectedRouter history={history} className='App2'>
        {/* <TopNavigator is_loginApp = {true} className='TopNavigator' nav={is_loginApp}></TopNavigator>
        <SideNavigator is_loginApp = {true} className='SideNavigator' nav={is_loginApp} /> */}

        <Switch>

          <Route path="/intro">
            <IntroPrivateRoute path="/intro" exact component={Intro2} />
            <IntroPrivateRoute path="/intro/login" exact component={Login} />
          </Route>


          {/* <Route path="/signup" exact component={Signup} />
          <Route path="/findpwd" exact component={FindPassword} /> */}
          {/* <Route path="/oauth/callback/kakao"component={OAuth2RedirectHandler}/> */}


          <Route path="/main">
        
              {/* <PrivateRoute path="/main" component={TopNavigator} />
              <PrivateRoute path="/main" component={SideNavigator} /> */}
              <PrivateRoute path="/main/post" exact component={Post} />
            
          </Route>
              {/* <PrivateRoute path="/main/search" exact component={MainSearch} />
              <PrivateRoute path="/main/mypage" exact component={mypage} />
              <PrivateRoute path="/main/postbox" exact component={postbox} />
              <PrivateRoute path="/main/myfeed" exact component={myfeed} />
              <PrivateRoute path="/main/timecapsule" exact component={timecapsule} />
              <PrivateRoute path="/main/OtherFeeds" exact component={() => <Otherfeeds education={data} />}/> */}


          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
      {/* <Footer /> */}
    </div>
  );
}
  
export default App;