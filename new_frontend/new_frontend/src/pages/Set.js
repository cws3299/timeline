import React from 'react'
import './Set.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { history } from "../redux/configureStore"

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        position:'absolute',
        top:'5px',
        right:'30px',
      },
    },
  }));

function Set() {
    const classes = useStyles();

    const onClick = () => {
        history.push({
            pathname:"/main/home2"
        })
    }

    return(
        <div>
            <div className="Image1">
                
            </div> 
            <div className="Image2">
                
            </div> 
            <div className="Image3">
                
            </div> 
            <div className="Image4">
                
            </div> 
            <div className="Image5">
                
            </div> 
            <div className ='SetFix'>
                <div className ='SetFix1'>
                    <div className={classes.root}>
                        <Button variant="contained" color="primary" onClick={onClick}>
                            타임라인 시작하기
                        </Button>
                    </div>
                </div>
            </div>  
        </div>
    )
};

export default Set;