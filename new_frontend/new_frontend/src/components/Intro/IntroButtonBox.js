import React from'react';
import './IntroButtonBox.css'
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { history } from "../../redux/configureStore";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

const useStyles = makeStyles({
    text: {
      color: "black",
      backgroundColor: "white",
      fontSize:"0.5rem"
    },
  });


function IntroButtonBox() {
    const classes = useStyles();
    return (
      <div className="IntroButtonBox">
        <div className="Box">
            <Button  className={classes.text} 
            onClick={() => {
                        history.push("/intro/login");
                        }}
            >로그인</Button>  
        </div>
      </div>
    );
  }
  
  export default IntroButtonBox;