import React ,{useState} from 'react'
import ReactDOM from "react-dom";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './Post.css'
import Post from './Post'

const useStyles = makeStyles({
    root:{
        width:'50px',
        height:'30px',
        backgroundColor:'black'
    },
})

function PostBox (props) {
    const classes = useStyles(props);
    let [isClicked, setIsClicked] = useState(false)

    const Clicked = () => {
        setIsClicked(() =>{

            if (isClicked === false){
                isClicked = true
            } else {
                isClicked = false
            }
        }
        )
        console.log('________',isClicked)
    }

    function UserGreeting(props) {
        return <h1>Welcome back!</h1>;
      }
      
    function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
    }

    function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
    }

  return(

    ReactDOM.render(
        <div className="Post">
            <div className="PostButton"> <Button className={classes.root} onClick={Clicked}/> </div>
            <div className='PostBox'>
                <Post />
            </div>
        </div>,
        document.getElementById('root')
      )
      )
  }


export default PostBox;