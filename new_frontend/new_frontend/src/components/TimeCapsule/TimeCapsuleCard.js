import React, {useState , useEffect} from 'react'
import './TimeCapsuleCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LinesEllipsis from 'react-lines-ellipsis'
import { config } from '../../shared/config'
import TimeCapsuleTimer from './TimeCapsuleTimer';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { history } from "../../redux/configureStore";
import Button from '@material-ui/core/Button';

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
          margin: '2px',
          width: '850px',
          height:'40px'
        //   backgroundColor:'black'
        },
      },
    root: {
    '& > *': {
        margin: '2px',
        width:'95%',
        height:'90%'
    },
    },
  }));

function TimeCapsuleCard({props}) {

    // const move = () => {
    //     history.push({
    //         pathname: "/main/timeline",
    //         })

    // }

    const setDate = new Date(props.tcterm)
    const now = new Date()
    const distance = setDate.getTime() - now.getTime() - 32400000;
    const dday = Math.floor(distance/(1000*60*60*24));

    const classes = useStyles();
    const url = config.api
    const [open, setOpen] = useState(false);
    const [feedback11, setFeedback] = useState(props.tcfeedback)
    const [back, setBack] = useState('');
    const [useElipsis, setUseElipsis] = useState(true);
    const [tcCreateDate, setTcCreateDate] = useState("");
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
    }

    const feedback1= async() => {


        const tcfeedback = {
            tcfeedback:back
        }
        const res = await axios.post(`${url}/timecapsule/feedback/${props.tcidx}`, tcfeedback, token);
        await setFeedback(back)
        
        // move()

    } 

    useEffect(()=>{
        setTcCreateDate(props.tcregdate.slice(0,10))
        // setFeedback(props.tcfeedback)
        // console.log('--------------',feedback11)
    })

    console.log('props00',props)
    // const body = (
    //     <div className={classes.paper}>
    //         <div className="CapsuleModal1">
    //             {props.tctitle}
    //         </div>
    //         <div className="CapsuleModal2">
                // {useElipsis ? (
                //     <LinesEllipsis
                //     text={props.tccontent}
                //     maxLine="10"
                //     ellipsis={
                //         <span style={{ color: "black" , fontSize:'0.5rem'}} onClick={() => setUseElipsis(false)}>
                //         ...?????????
                //         </span>
                //     }
                //     trimRight
                //     basedOn="letters"
                //     />
                // ) : (
                //     <>
                //     {props.tlccontent}
                //     <span style={{ color: "black" , fontSize:'0.5rem' }} onClick={() => setUseElipsis(true)}>
                //         ??????
                //     </span>
                //     </>
                // )}
    //         </div>
    //         <div className="CapsuleModal3">
    //             {props.tcthink}
    //         </div>
    //         <div className="CapsuleModal4">
    //             <div className="CapsuleModal4Feedback">{feedback11}</div>
                // <div className="CapsuleModal4FeedbackButton">
                //     <form className={classes.roots} noValidate autoComplete="off">
                //         <div>
                //         <TextField
                //             onChange={feedbackChange}
                //             id="outlined-multiline-static"
                //             multiline
                //             rows={1}
                //             placeholder = "???????????? ??????????????????"
                //             variant="outlined"
                //             />
                //         </div>
                //     </form>
                //     <button className="CapsuleModal4FeedbackButton1" onClick={feedback1}>????????? ??????</button>
                // </div>
    //         </div>
    //     </div>
    // )

    const body = (
        <div className={classes.paper}>
            <div className="TCC1">
                <div className="TCC11">
                    {props.tctitle}
                </div>
                <div className="TCC12">
                    ??????:  {tcCreateDate}
                </div>
                <div className="TCC13">
                    open:  {props.tcterm}
                </div>
            </div>
            <div className="TCC2">
                <div className="TCC21">
                    {useElipsis ? (
                        <LinesEllipsis
                        text={props.tccontent}
                        maxLine="10"
                        ellipsis={
                            <span style={{ color: "black" , fontSize:'0.5rem'}} onClick={() => setUseElipsis(false)}>
                            ...?????????
                            </span>
                        }
                        trimRight
                        basedOn="letters"
                        />
                    ) : (
                        <>
                        {props.tlccontent}
                        <span style={{ color: "black" , fontSize:'0.5rem' }} onClick={() => setUseElipsis(true)}>
                            ??????
                        </span>
                        </>
                    )}
                </div>
                <div className="TCC22">
                    <span className="sdfsdf">???????????? ????????? ??? ?????? :</span> {props.tcthink}
                </div>
                <div className="TCC23">
                    <span className="sdfsdf">??????????????? ?????? ?????????:</span> {feedback11}
                </div>
            </div>
            <div className="TCC3">
                <div className="TCC31">
                    <div className="TCC311">
                        <div className="TCC3111">
                            <form className={classes.roots} noValidate autoComplete="off">
                                <div>
                                <TextField
                                    onChange={feedbackChange}
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={1}
                                    placeholder = "???????????? ??????????????????"
                                    variant="outlined"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={classes.root}>
                        <Button variant="contained" color="primary" onClick={feedback1}>
                            ????????? ??????
                        </Button>
                        {/* <button className="CapsuleModal4FeedbackButton1" onClick={feedback1}>????????? ??????</button> */}
                    </div>
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