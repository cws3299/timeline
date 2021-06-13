import React from'react';
import './IntroButtonBox.css'
import { Modal,Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { history } from "../redux/configureStore";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
// import SignIn from'../Components/SignIn';
const useStyles = makeStyles({
  text: {
    color: "black",
    backgroundColor: "white",
    fontSize:"0.5rem"
  },
});


function ButtonBox() {
    const classes = useStyles();
    return (
      <div className="ButtonBox">
        {/* <div className="Box">
          <Link to="/SignIn" className="Button_siginin">
            <Button  color="primary">로그인</Button>
          </Link>
          <Link to="/SignUp" className="Button_signup">
            <Button  color="primary">회원가입</Button>
          </Link>
        </div> */}
        <div className="Box">
          <Button  className={classes.text} 
          onClick={() => {
                      history.push("/intro/login");
                    }}
          >로그인</Button>
          <Button  className={classes.text}>회원가입</Button>
        </div>
      </div>
    );
  }
  
  export default ButtonBox;