import React ,{useState} from 'react'
// import ReactDOM from "react-dom";
// import { Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import './Post.css'

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
  
function GuestGreeting(props) {
return <h1>Please sign up.</h1>;
}

function Greeting(props) {
const isLoggedIn = props.isLoggedIn;
if (isLoggedIn) {
    return <GuestGreeting />;
}
return <UserGreeting />;
}

export default Greeting;