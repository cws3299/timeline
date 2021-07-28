import React, {useState} from 'react'
import './TimeCapsuleCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LinesEllipsis from 'react-lines-ellipsis'
import { config } from '../../shared/config'
import TimeCapsuleTimer from './TimeCapsuleTimer';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      top:100,
      left:'17.5%',
      width: 1000,
      height:600,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    //   padding: theme.spacing(2, 4, 3),
    },
    roots: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '850px',
        },
      },
  }));

function TimeCapsuleCard({props}) {

    const setDate = new Date(props.tcterm)
    const now = new Date()
    const distance = setDate.getTime() - now.getTime() - 32400000;
    const dday = Math.floor(distance/(1000*60*60*24));

    const classes = useStyles();
    const url = config.api
    const [open, setOpen] = useState(false);
    const [back, setBack] = useState('');
    const [useElipsis, setUseElipsis] = useState(true);
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const feedbackChange = (e) => {
        setBack(e.target.value)
        console.log(e.target.value)
    }

    const feedback1= async() => {


        const feedback = {
            feedback:back
        }
        const res = await axios.post(`${url}/timecapsule/feedback/${props.tcidx}`, feedback, token);
        console.log(res)
    } 

    const body = (
        <div className={classes.paper}>
            <div className="CapsuleModal1">
                {props.tctitle}
            </div>
            <div className="CapsuleModal2">
                {useElipsis ? (
                    <LinesEllipsis
                    text={props.tccontent}
                    maxLine="10"
                    ellipsis={
                        <span style={{ color: "black" , fontSize:'0.5rem'}} onClick={() => setUseElipsis(false)}>
                        ...더보기
                        </span>
                    }
                    trimRight
                    basedOn="letters"
                    />
                ) : (
                    <>
                    {props.tlccontent}
                    <span style={{ color: "black" , fontSize:'0.5rem' }} onClick={() => setUseElipsis(true)}>
                        닫기
                    </span>
                    </>
                )}
            </div>
            <div className="CapsuleModal3">
                {props.tcthink}
            </div>
            <div className="CapsuleModal4">
                <div className="CapsuleModal4Feedback">{props.tcfeedback}</div>
                <div className="CapsuleModal4FeedbackButton">
                    <form className={classes.roots} noValidate autoComplete="off">
                        <div>
                        <TextField
                            onChange={feedbackChange}
                            id="outlined-multiline-static"
                            multiline
                            rows={1}
                            placeholder = "피드백을 수정해주세요"
                            variant="outlined"
                            />
                        </div>
                    </form>
                    <button className="CapsuleModal4FeedbackButton1" onClick={feedback1}>피드백 수정</button>
                </div>
            </div>
        </div>
    )
    if (dday>=0){
        return(
            <div className='TimeCapsuleCard'>
                <div className ="TimeCapsuleCardContent">
                    <div className ="TimeCapsuleCardContentTitle">
                        {props.tctitle}
                    </div>
                </div>
                <div className = "TimeCapsuleCardRemain" onClick={handleOpen}>
                    <TimeCapsuleTimer props={props}/>
                </div>
            </div>
        )
    }else{
        return(
            <div className='TimeCapsuleCard'>
                <div className ="TimeCapsuleCardContent">
                    <div className ="TimeCapsuleCardContentTitle">
                        {props.tctitle}
                    </div>
                </div>
                <div className = "TimeCapsuleCardRemain" onClick={handleOpen}>
                    <TimeCapsuleTimer props={props}/>
                </div>
                <Modal
                    props={props}
                    open={open}
                    onClose={handleClose}
                    // onClose={()=>setIsListHover(true)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>
        )   
    }

}

export default TimeCapsuleCard;