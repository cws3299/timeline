import React from "react";
// import styled from "styled-components";
import {
    Home,
    Home2,
    Intro,
    Login,
    Mypage,
    Post,
    PostBox,
    Search,
    TimeCapsule,
    TimeLine,
    NotFound,
    TimeLineFeed,
} from "../pages/index";

import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
// import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import PrivateRoute from "./PrivateRoute";
import NoLoginRoute from "./NoLoginRoute";
// import './App.css'


function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/intro">
            <NoLoginRoute path="/intro/intro" exact component={Intro} />
            <NoLoginRoute path="/intro/login" exact component={Login} />
          </Route>
          

          <Route path="/main">
              <PrivateRoute path="/main/home" exact component={Home} />
              <PrivateRoute path="/main/home2" exact component={Home2} />
              <PrivateRoute path="/main/mypage" exact component={Mypage} />
              <PrivateRoute path="/main/post" exact component={Post} />
              <PrivateRoute path="/main/postbox" exact component={PostBox} />
              <PrivateRoute path="/main/search" exact component={Search} />
              <PrivateRoute path="/main/timecapsule" exact component={TimeCapsule} />
              <PrivateRoute path="/main/timeline" exact component={TimeLine} />
              <PrivateRoute path="/main/TimeLineFeed" exact component={TimeLineFeed} />
         
          </Route>
          <Route path="/notfound" exact component={NotFound}></Route>
          {/* <Route component={NotFound} /> */}
        </Switch>
      </ConnectedRouter>
    
    </div>
  );
}


export default App;