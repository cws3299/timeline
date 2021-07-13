import React, {useState} from 'react'
import './TimeLineFeedListCard'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LinesEllipsis from 'react-lines-ellipsis'

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
//   }
  
//   function getModalStyle() {
//     const top = 100
//     const left = 100
  
//     return {
//       top: `${top}px`,
//       left: `${left}px`,
//       transform: `translate(-${top}px, -${left}px)`,
//     };
//   }
  
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
  }));

function TimeLineFeedListCard({props}){
    const classes = useStyles();
    // const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(props)
    const [useElipsis, setUseElipsis] = useState(true);

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const [isListHover, setIsListHover] = useState(true);
    const [isListHover2, setIsListHover2] = useState(true);
    const place = props.tlcplace

    const body = (
        <div className={classes.paper}>
            <div className="Home2ImageModal">
                <div className="Home2ImageModalImage"
                    style={{
                        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kang_Seul-gi_at_Coca-Cola_Event_on_January_18%2C_2020_03.jpg/250px-Kang_Seul-gi_at_Coca-Cola_Event_on_January_18%2C_2020_03.jpg)`,
                        backgroundSize:'cover',
                        width:'100%',
                        height:'100%',
                        // boxSizing:'border-box'
                    }}
                ></div>
                <div className="Home2ImageModalContent">
                    <div className="Home2ImageModalContentUser">
                        <img src="https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2020/11/PS20112100014.jpg" className="Home2avatarImage" />
                        {data.mnickname}
                    </div>
                    <div className="Home2ImageModalContentContent">
                    {useElipsis ? (
                        <LinesEllipsis
                        text={data.tlccontent}
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
                        {data.tlccontent}
                        <span style={{ color: "black" , fontSize:'0.5rem' }} onClick={() => setUseElipsis(true)}>
                            닫기
                        </span>
                        </>
                    )}
                    </div>
                    <div className="Home2ImageModalContentInfo">
                        {data.tlcplace}
                    </div>
                    <div className="Home2ImageModalContentEmotion">
                        <i class="far fa-thumbs-up" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-thumbs-up" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-surprise" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                    </div>
                    <div className="Home2ImageModalContentEmotionCount">
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.egoodyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.efightingyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.econgratulationyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.eexpectyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.esurpriseyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.esadyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.eniceyn}</span> 
                    </div>
                </div>
            </div>
        </div>
      );

      const body2 = (
        <div className={classes.paper}>
            <div className="Home2ImageModal2">
                <div className="Home2ImageModal2ContentUser">
                    <img src="https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2020/11/PS20112100014.jpg" className="Home2avatarImage" />
                    {data.mnickname}
                </div>
                <div className="Home2ImageModal2ContentBox">
                    <div className="Home2ImageModal2ContentContent">
                    {useElipsis ? (
                        <LinesEllipsis
                        text={data.tlccontent}
                        maxLine="15"
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
                        {data.tlccontent}
                        <span style={{ color: "black" , fontSize:'0.5rem' }} onClick={() => setUseElipsis(true)}>
                            닫기
                        </span>
                        </>
                    )}
                    </div>
                </div>
                <div className="Home2ImageModal2ContentInfo">
                        {data.tlcplace}
                    </div>
                    <div className="Home2ImageModal2ContentEmotion">
                        <i class="far fa-thumbs-up" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-thumbs-up" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-surprise" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                    </div>
                    <div className="Home2ImageModal2ContentEmotionCount">
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.egoodyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.efightingyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.econgratulationyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.eexpectyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.esurpriseyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.esadyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{data.emotioncountdto.eniceyn}</span> 
                    </div>
            </div>
        </div>
      );


    if (props.tlcimage === null){
        return(
            <div className="Home2Card"

            >
                {
                isListHover2 ?
                
                <div className='Home2CardImageOffImage1'
                onClick={handleOpen}
                onMouseEnter={()=>setIsListHover2(false)}
                style={{
                    width:'300px',
                    height:'300px',
                    boxSizing:'border-box',
                    backgroundColor:'black',
                    color:'white',
                    position:'absolute',
                }}>
                    {place}
                </div> :
                <div className='Home2CardImageOffImage2'
                onMouseLeave={()=>setIsListHover2(true)}
                style={{
                    width:'100%',
                    height:'100%',
                    boxSizing:'border-box',
                    backgroundColor:'black',
                }}
                >
                    <div className='Home2CardImageOffImage2In'
                    onClick={handleOpen}
                    >
                        {place}
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
                </div>
            }
            </div>
        )
    } else {
        return (
            <div className="Home2CardImageOn"
            >
                {
                isListHover ?
                <div className='Home2CardImageOnImage1'
                onClick={handleOpen}
                onMouseEnter={()=>setIsListHover(false)}
                style={{
                    backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kang_Seul-gi_at_Coca-Cola_Event_on_January_18%2C_2020_03.jpg/250px-Kang_Seul-gi_at_Coca-Cola_Event_on_January_18%2C_2020_03.jpg)`,
                    backgroundSize:'cover',
                    width:'100%',
                    height:'100%',
                    boxSizing:'border-box'
                }}>
                </div> :
                <div className='Home2CardImageOnImage2'
                
                onMouseLeave={()=>setIsListHover(true)}
                style={{
                    backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kang_Seul-gi_at_Coca-Cola_Event_on_January_18%2C_2020_03.jpg/250px-Kang_Seul-gi_at_Coca-Cola_Event_on_January_18%2C_2020_03.jpg)`,
                    backgroundSize:'cover',
                    width:'100%',
                    height:'100%',
                    boxSizing:'border-box'
                }}
                >
                    <div className='Home2CardImageOnImage2In'
                    onClick={handleOpen}
                    >
                        {place}
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
            }
            </div>
        )
    }
}

export default TimeLineFeedListCard;