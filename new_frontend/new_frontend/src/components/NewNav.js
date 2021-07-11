import React from 'react'
import { history } from "../redux/configureStore"
import './NewNav.css'
import { Input } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
//   }));

function NewNav(){
    // const classes = useStyles();

    return(
        <div className = "NewNav" >
            <div className = "NewNav2"> 
                <div className ="NewNavHomeBox">
                    <div className ="NewNavHome">TimeLine</div>
                </div>
                <div className ="NewNavSearchBox">
                    <Input />
                </div>
                <div className ="NewNavButtonBox">
                    <i class="far fa-envelope" style={{paddingLeft:'10px', paddingRight:'10px'}}></i>
                    <i class="fas fa-history" style={{paddingLeft:'10px', paddingRight:'10px'}}></i>
                    <i class="fas fa-user" style={{paddingLeft:'10px', paddingRight:'10px'}}></i>
                </div>
            </div>
        </div>
    )
}

export default NewNav;