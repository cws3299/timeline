import React, {useState} from 'react'
import './TimeCapsuleCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LinesEllipsis from 'react-lines-ellipsis'
import { config } from '../../shared/config'

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
  }));

function TimeCapsuleCard({props}) {
    const classes = useStyles();
    const url = config.api
    const [open, setOpen] = useState(false);
    const [useElipsis, setUseElipsis] = useState(true);
    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

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

            </div>
            <div className="CapsuleModal4">
                {props.tcfeedback}
            </div>
        </div>
    )

    return(
        <div className='TimeCapsuleCard'>
            <div className ="TimeCapsuleCardContent">
                <div className ="TimeCapsuleCardContentTitle">
                    {props.tctitle}
                </div>
            </div>
            <div className = "TimeCapsuleCardRemain" onClick={handleOpen}>
                24Day 16:08:13
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

export default TimeCapsuleCard;