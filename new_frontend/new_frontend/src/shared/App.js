import React from "react";
// import styled from "styled-components";
import {
    Home,
    Intro,
    Login,
    Mypage,
    Post,
    PostBox,
    Search,
    TimeCapsule,
    TimeLine,
    NotFound,
} from "../pages/index";

import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
// import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import PrivateRoute from "./PrivateRoute";
import NoLoginRoute from "./NoLoginRoute";


function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/intro">
            <NoLoginRoute path="/intro/intro" exact component={Intro} />
            <NoLoginRoute path="/intro/login" exact component={Login} />
          </Route>
          

          <Route path="/main">
              <PrivateRoute path="/main/Home" exact component={Home} />
              <PrivateRoute path="/main/Mypage" exact component={Mypage} />
              <PrivateRoute path="/main/Post" exact component={Post} />
              <PrivateRoute path="/main/PostBox" exact component={PostBox} />
              <PrivateRoute path="/main/PostBox" exact component={Search} />
              <PrivateRoute path="/main/PostBox" exact component={TimeCapsule} />
              <PrivateRoute path="/main/PostBox" exact component={TimeLine} />
         
          </Route>
          <Route path="/notfound" exact component={NotFound}></Route>
          {/* <Route component={NotFound} /> */}
        </Switch>
      </ConnectedRouter>
    
    </>
  );
}


export default App;