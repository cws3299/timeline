import React, {useState} from 'react'
// import './TimeLineFeedListCard'
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

    const classes = useStyles();
    console.log(props)
    // const [modalStyle] = useState(getModalStyle);
    const url = config.api
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(props)
    const [useElipsis, setUseElipsis] = useState(true);
    const u = data.tlcidx
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };
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

    // const [egoodyn11color ,setEgoodyn11color] = useState("black")
    // const [efightingyn11color ,setEfightingyn11color] = useState("black")
    // const [econgratulationyn11color ,setEcongratulationyn11color] = useState("black")
    // const [eexpectyn11color ,setEexpectyn11color] = useState("black")
    // const [egooesurpriseyndyn11color ,setEsurpriseyn11color] = useState("black")
    // const [esadyn11color ,setEsadyn11color] = useState("black")
    // const [eniceyn11color ,setEniceyn11color] = useState("black")
    // 내가 눌렀는지 안눌렀는지의 유무가 데이터로 와야함




    const goLetter = () => {
        history.push({
            pathname: "/main/letter",
            state: {tlcidx: data.tlcidx}
          })
      } 

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

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
                        <div className="Home2ImageModalContentUser1">
                            <img src="https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2020/11/PS20112100014.jpg" className="Home2avatarImage" />
                            {data.mnickname}
                        </div>
                        <div className="Home2ImageModalContentUser2" onClick={goLetter}>
                            <i class="far fa-envelope"></i>
                        </div>
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
                        <i class="far fa-thumbs-up" onClick={egoodyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-thumbs-up" onClick={efightingyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-surprise" onClick={econgratulationyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" onClick={eexpectyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" onClick={esurpriseyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" onClick={esadyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" onClick={eniceyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
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
                <div className="Home2ImageModal2ContentUser">
                    <div>
                        <img src="https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2020/11/PS20112100014.jpg" className="Home2avatarImage" />
                        {data.mnickname}
                    </div>
                    <div className="Home2ImageModal2ContentUser2" onClick={goLetter}>
                        <i class="far fa-envelope"></i>
                    </div>
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
                        <i class="far fa-thumbs-up" onClick={egoodyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-thumbs-up" onClick={efightingyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-surprise" onClick={econgratulationyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" onClick={eexpectyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" onClick={esurpriseyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" onClick={esadyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-heart" onClick={eniceyn1} style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                    </div>
                    <div className="Home2ImageModal2ContentEmotionCount">
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