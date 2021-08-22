import React, {useState} from 'react'
import './TimeLineFeedListCard.css'
import '../Home2/Home2Card.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LinesEllipsis from 'react-lines-ellipsis'
import { config } from '../../shared/config'
import { history } from "../../redux/configureStore"
import axios from 'axios'
  
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

    const id = localStorage.getItem("id");
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };


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

    const [egoodyn ,setEgoodyn] = useState(props.emotioncountdto.egoodyn)
    const [efightingyn ,setEfightingyn] = useState(props.emotioncountdto.efightingyn)
    const [econgratulationyn ,setEcongratulationyn] = useState(props.emotioncountdto.econgratulationyn)
    const [eexpectyn ,setEexpectyn] = useState(props.emotioncountdto.eexpectyn)
    const [egooesurpriseyndyn ,setEsurpriseyn] = useState(props.emotioncountdto.esurpriseyn)
    const [esadyn ,setEsadyn] = useState(props.emotioncountdto.esadyn)
    const [eniceyn ,setEniceyn] = useState(props.emotioncountdto.eniceyn)

    const [egoodyn11 ,setEgoodyn11] = useState("NO")
    const [efightingyn11 ,setEfightingyn11] = useState("NO")
    const [econgratulationyn11 ,setEcongratulationyn11] = useState("NO")
    const [eexpectyn11 ,setEexpectyn11] = useState("NO")
    const [egooesurpriseyndyn11 ,setEsurpriseyn11] = useState("NO")
    const [esadyn11 ,setEsadyn11] = useState("NO")
    const [eniceyn11 ,setEniceyn11] = useState("NO")

    const egoodyn1 = () =>{
        try{
            const res = axios.post(`${url}/post/emotion/${data.tlcidx}?emotion=good`,null,token)
            console.log('res',res)
            if(egoodyn11 === "NO"){
                setEgoodyn(egoodyn+1)
                setEgoodyn11("YES")
            }else{
                setEgoodyn(egoodyn-1)
                setEgoodyn11("NO")
            }
        }catch(err){
            console.log('err',err)
        }
    }
    const efightingyn1 = () =>{
        try{
            const res = axios.post(`${url}/post/emotion/${data.tlcidx}?emotion=fighting`,null,token)
            console.log('res',res)
            if(efightingyn11 === "NO"){
                setEfightingyn(efightingyn+1)
                setEfightingyn11("YES")
            }else{
                setEfightingyn(efightingyn-1)
                setEfightingyn11("NO")
            }
        }catch(err){
            console.log('err',err)
        }
    }
    const econgratulationyn1 = () =>{
        try{
            const res = axios.post(`${url}/post/emotion/${data.tlcidx}?emotion=congratulation`,null,token)
            console.log('res',res)
            if(econgratulationyn11 === "NO"){
                setEcongratulationyn(econgratulationyn+1)
                setEcongratulationyn11("YES")
            }else{
                setEcongratulationyn(econgratulationyn-1)
                setEcongratulationyn11("NO")
            }
        }catch(err){
            console.log('err',err)
        }
    }
    const eexpectyn1 = () =>{
        try{
            const res = axios.post(`${url}/post/emotion/${data.tlcidx}?emotion=expect`,null,token)
            console.log('res',res)
            if(eexpectyn11 === "NO"){
                setEexpectyn(eexpectyn+1)
                setEexpectyn11("YES")
            }else{
                setEexpectyn(eexpectyn-1)
                setEexpectyn11("NO")
            }
        }catch(err){
            console.log('err',err)
        }
    }
    const esurpriseyn1 = () =>{
        try{
            const res = axios.post(`${url}/post/emotion/${data.tlcidx}?emotion=surprise`,null,token)
            console.log('res',res)
            if(egooesurpriseyndyn11 === "NO"){
                setEsurpriseyn(egooesurpriseyndyn+1)
                setEsurpriseyn11("YES")
            }else{
                setEsurpriseyn(egooesurpriseyndyn-1)
                setEsurpriseyn11("NO")
            }
        }catch(err){
            console.log('err',err)
        }        
    }
    const esadyn1 = () =>{
        try{
            const res = axios.post(`${url}/post/emotion/${data.tlcidx}?emotion=sad`,null,token)
            console.log('res',res)
            if(esadyn11 === "NO"){
                setEsadyn(esadyn+1)
                setEsadyn11("YES")
            }else{
                setEsadyn(esadyn-1)
                setEsadyn11("NO")
            }
        }catch(err){
            console.log('err',err)
        }             
    }
    const eniceyn1 = () =>{
        try{
            const res = axios.post(`${url}/post/emotion/${data.tlcidx}?emotion=nice`,null,token)
            console.log('res',res)
            if(eniceyn11 === "NO"){
                setEniceyn(eniceyn+1)
                setEniceyn11("YES")
            }else{
                setEniceyn(eniceyn-1)
                setEniceyn11("NO")
            }
        }catch(err){
            console.log('err',err)
        }           
    }

    const create_memo = () => {
        history.push({
            pathname: "/main/memo",
            state: {tlcidx: data.tlcidx}
          })
      } 

    const body = (
        <div className={classes.paper}>
            <div className="Home2ImageModal">
                <div className="Home2ImageModalImage111"
                    style={{
                        backgroundImage: `url(https://img1.yna.co.kr/etc/inner/KR/2020/10/26/AKR20201026050600017_03_i_P2.jpg)`,
                        backgroundSize:'100% 100%',
                        // boxSizing:'border-box'
                    }}
                ></div>
                <div className="Home2ImageModalContent">
                    <div className="Home2ImageModalContentUser1111">
                        <div className="d110">
                            <img src="https://img1.yna.co.kr/etc/inner/KR/2020/10/26/AKR20201026050600017_03_i_P2.jpg" className="Home2avatarImage" />
                            {data.mnickname}
                        </div>
                        <div className="d111"></div>
                        <button className="d112" onClick={create_memo}>쪽지로 이동</button>
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
                    <i class="far fa-thumbs-up"  style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-thumbs-up"  style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-surprise"  style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart"  style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart"  style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                    </div>
                    <div className="Home2ImageModalContentEmotionCount">
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{egoodyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{efightingyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{econgratulationyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{eexpectyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{egooesurpriseyndyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{esadyn}</span> 
                        <span style={{paddingLeft:'11px',paddingRight:'11px'}}>{eniceyn}</span> 
                    </div>
                </div>
            </div>
        </div>
      );

      const body2 = (
        <div className={classes.paper}>
            <div className="Home2ImageModal2">
                <div className="Home2ImageModal2ContentUser1111">
                    <div className="d110">
                        <img src="https://img1.yna.co.kr/etc/inner/KR/2020/10/26/AKR20201026050600017_03_i_P2.jpg" className="Home2avatarImage" />
                        {data.mnickname}
                    </div>
                    <div className="d111"></div>
                    <button className="d112" onClick={create_memo}>쪽지로 이동</button>
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
                    backgroundImage: `url(https://img1.yna.co.kr/etc/inner/KR/2020/10/26/AKR20201026050600017_03_i_P2.jpg)`,
                    backgroundSize:'cover',
                    width:'100%',
                    height:'100%',
                    boxSizing:'border-box'
                }}>
                </div> :
                <div className='Home2CardImageOnImage2'
                
                onMouseLeave={()=>setIsListHover(true)}
                style={{
                    backgroundImage: `url(https://img1.yna.co.kr/etc/inner/KR/2020/10/26/AKR20201026050600017_03_i_P2.jpg)`,
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