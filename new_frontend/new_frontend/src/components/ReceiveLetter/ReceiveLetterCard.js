import React , {useEffect, useState} from 'react'
import './ReceiveLetterCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { history } from "../../redux/configureStore"

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      top:100,
      left:'17.5%',
      width: 1000,
      height:610,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    //   padding: theme.spacing(2, 4, 3),
    },
    submit: {
        '& > *': {
          margin: theme.spacing(1),
          width: '500px',
          height: '50px',
        },
      },
    root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '480px',
    },
    },
  }));

  
  function ReceiveLetterCard({props}) {
    const classes = useStyles();
    console.log('props',props)

    const answer = () => {
        history.push({
            pathname: "/main/AnswerLetter",
            state: {lidx: props.lidx}
          })
    }

    const go = () => {
        history.push({
            pathname:"/main/GoLetter",
            state:{go_idx:props.lidx_2}
        })
    }
      
    const body2 = (
        <div className={classes.paper}>
            <div className = "RLC_Modal">
                <div className="RLC_info">
                    <div className="RLC_name">
                        보낸이
                    </div>
                    <div className="RLC_photo" style={{
                        backgroundImage:'url(data:image/jpeg;base64,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)',
                        backgroundSize:'cover'
                    }}>

                    </div>
                    <div className="RLC_modalButton" >
                        <Button  onClick={answer} className="RLC_modalButton2" variant="contained" color="secondary">
                            답장 보내기
                        </Button>
                        <Button  onClick={go} className="RLC_modalButton2" variant="contained" color="primary">
                            내가 보냈던 편지 보기
                        </Button>
                    </div>
                </div>

                <div className="RLC_modalcontent">
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="outlined-multiline-static"
                                label="편지내용"
                                multiline
                                rows={30}
                                defaultValue={props.lcontent}
                                variant="outlined"
                                />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

    const [open, setOpen] = useState(false);
    const [r_date, setR_date] = useState("")
    const [color, setColor] = useState({
        backgroundColor:'black',
        color:'white'

    })

    const changeDate = () =>{
        const new_date = props.lregdate.slice(0,10)
        setR_date(new_date)
    }

    useEffect(() => {
        changeDate();
        // return () => {
        //   stopTimer();
        // };
      });

    const onClick = () =>{
        console.log('--')
    }

    const onMouseOver = () =>{
        setColor({
            backgroundColor:'gray',
            color:'white'
        })
    }

    const onMouseLeave = () =>{
        setColor({
            backgroundColor:'black',
            color:'white'
        })
    }

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };
    

    return(
        <>
            <div className ="ReceiveLetterCard" onClick={handleOpen} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
                <div className="RLC_sender" style={{backgroundColor:`${color.backgroundColor}`, color:`${color.color}`}}>
                    <div className="RLC_senderName">
                        보낸이
                    </div>
                    <div className="RLC_tlidx">
                        {props.tlcidx}
                    </div>
                </div>
                <div className="RLC_content">
                    {props.lcategory}
                </div>
                <div className="RLC_date">
                    {r_date}
                </div>
            </div>
            <Modal
                props={props}
                open={open}
                onClose={handleClose}
                // onClose={()=>setIsListHover(true)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body2}
            </Modal>
        </>
    )
}

export default ReceiveLetterCard;
