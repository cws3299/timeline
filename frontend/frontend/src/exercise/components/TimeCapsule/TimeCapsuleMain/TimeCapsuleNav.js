import React from 'react'
import './TimeCapsuleNav.css';
import { Input  } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    search: {
      padding: "15px",
      borderRadius: "5px",
      backgroundColor:"white",
      color:"black",
      height:"10%",
    },
  }));

function TimeCapsuleNav() {
    const classes = useStyles();
    return (
        <div className = "TimeCapsuleNav">

        </div>
    )
};

export default TimeCapsuleNav;