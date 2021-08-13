import React, { useState,useEffect } from 'react'
import './SearchTimelineCard.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { history } from "../../../redux/configureStore";
import { actionCreators as usertimeActions } from "../../../redux/modules/usertimelinefeed";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root1: {
        '& > *': {
          margin: theme.spacing(1),
          width:'980px',
        //   height:'62px',
        },
      },
  }));

function SearchTimelineCard(props){
    const dispatch = useDispatch();
    const [data , setData] = useState(null)
    const feedidx= (idx) =>{
        dispatch(usertimeActions.usersettimeFeedSV(idx));
      } 

    const onClick = async() =>{
        console.log('pppppppppppppppppppppppppppp',data)
        await feedidx(data.tlidx)
        history.push({
            pathname: '/main/usertimelinefeed',
          })
    }
    console.log('timeline',props)
    const classes = useStyles();

    useEffect(()=>{
        setData(props.props)
    })
    return(
        <div className="SearchTimelineCard">
            <div className="SearchTimelineCard1">
                {props.props.tltitle}
            </div>
            <div className="SearchTimelineCard2">
                {props.props.tlintroduce}
            </div>
            <div className="SearchTimelineCard3">
                <div className={classes.root1}>
                    <Button variant="contained" color="primary" onClick={onClick}>
                        타임라인으로 이동하기
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SearchTimelineCard;