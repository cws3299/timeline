import React , {useEffect, useState} from 'react'
import './SearchTagCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LinesEllipsis from 'react-lines-ellipsis'
import Button from '@material-ui/core/Button';
import axios from "axios";
import { config } from '../../../shared/config'
import { actionCreators as usertimeActions } from "../../../redux/modules/usertimelinefeed";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../../redux/configureStore";

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      top:100,
      left:'21.5%',
      width: 850,
      height:500,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    //   padding: theme.spacing(2, 4, 3),
    },
    root1: {
        '& > *': {
          margin: theme.spacing(1),
          width:'210px',
        //   height:'62px',
        },
      },
    root2: {
    '& > *': {
        margin: theme.spacing(1),
        width:'210px',
    },
    },
  }));

function SearchTagCard(props){
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [useElipsis, setUseElipsis] = useState(true);
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };
    console.log(props)
    const tag = props.props.tag
    const tagg = tag.join(' #')
    console.log('img',props.props.tlcimage)
    const feedidx= (idx) =>{
        dispatch(usertimeActions.usersettimeFeedSV(idx));
      } 

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };
    const [mImg , setMimg] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE4-IM70qjVRp3sLCP5IAjVpciNZa58m7bz9rEUMQBZTO_LzI8nKZxV__pGJIgkgPzqHg&usqp=CAU")
    const [pImg , setPimg] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE4-IM70qjVRp3sLCP5IAjVpciNZa58m7bz9rEUMQBZTO_LzI8nKZxV__pGJIgkgPzqHg&usqp=CAU")

    // let mImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE4-IM70qjVRp3sLCP5IAjVpciNZa58m7bz9rEUMQBZTO_LzI8nKZxV__pGJIgkgPzqHg&usqp=CAU"
    // let pImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE4-IM70qjVRp3sLCP5IAjVpciNZa58m7bz9rEUMQBZTO_LzI8nKZxV__pGJIgkgPzqHg&usqp=CAU"

    useEffect(()=>{
        if(props.props.mphoto !== null){
            setMimg("http://www.anewsa.com/news_images/2020/12/15/mark/20201215124644.jpg")
            // mImg = "http://www.anewsa.com/news_images/2020/12/15/mark/20201215124644.jpg"
            // mImg = props.props.mphoto
        }
        if(props.props.tlcimage !== null){
            console.log('---')
            setPimg("http://www.anewsa.com/news_images/2020/12/15/mark/20201215124644.jpg")
            // pImg = "http://www.anewsa.com/news_images/2020/12/15/mark/20201215124644.jpg"
            // pImg = props.props.tlcimage
        }
    })

    const Follow = async() =>{
        console.log('follow',props.props.tlidx)
        try{
            const res = await axios.get(`${url}/follow/followtl?tlidx=${props.props.tlidx}` , token)
            console.log('팔로우 완료')
            alert('선택한 타임라인이 팔로우 되셨습니다')
            console.log('pppppppppppppppppppppppppppp',props.props)
            await feedidx(props.props.tlidx)
            history.push({
                pathname: '/main/usertimelinefeed',
              })
        }catch(err){

        }


    }

    const Go = async() =>{
        console.log('pppppppppppppppppppppppppppp',props.props)
        await feedidx(props.props.tlidx)
        history.push({
            pathname: '/main/usertimelinefeed',
          })
    }
    

    const body = (
        <div className={classes.paper}>
            <div className="Tagmodal">
                <div className="Tagmodal1">
                    <div className="TagmodalInfo">
                        <div 
                            style={{
                                backgroundImage:`url(${mImg})`,
                                backgroundSize:'100% 100%',
                            }}
                        className="Tag2avatarImage"></div>
                        {props.props.mnickname}
                    </div>
                    <div className="TagmodalImg"
                    style={{
                        backgroundImage:`url(${pImg})`,
                        backgroundSize:'cover',
                    }}>

                    </div>
                    <div className="TagmodalButton">
                        <div className={classes.root1}>
                            <Button variant="contained" color="secondary" onClick={Go}>
                                타임라인으로 이동하기
                            </Button>
                        </div>
                        <div className={classes.root2}>
                            <Button variant="contained" color="primary" onClick={Follow}>
                                타임라인 팔로우 하기
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="Tagmodal2">
                    <div className ="Tagmodal21">
                        <div className ="Tagmodal211">
                            장소 : {props.props.tlcplace}
                        </div>
                        <div className ="Tagmodal212">
                            {props.props.tlcdate}
                        </div>
                    </div>
                    <div className ="Tagmodal22">
                        {useElipsis ? (
                                <LinesEllipsis
                                text={props.props.tlccontent}
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
                                {props.props.tlccontent}
                                <span style={{ color: "black" , fontSize:'0.5rem' }} onClick={() => setUseElipsis(true)}>
                                    닫기
                                </span>
                                </>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
    return(
        <div  className="SearchTagCard">
            <div className="SearchTagCard"  onClick={handleOpen}>
                {/* {props.props.tlccontent} */}
                {tagg}
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

export default SearchTagCard;