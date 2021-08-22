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
                        backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABDlBMVEUAAAD///////0AAAL//v////j8//8AAgD///X///piWFMDAAAAAAXm0shuUT/IurN9cGSrm5P/+/j/+fHDvbNQSEETAABxXFD/+fOimpePh4EiHRr/9e36//xOPDTt5N3c2cwxJCBKPjohEhZYREBzWlc7KiYZCAgvJCB1Yl6bh4PLtbHs6t7gz8qSg3xrW1YmGhWgj4a/rqjRysE3Livu4N0jEAmEfXpsZF5gWlVAOTVaTkbf3Nfv6ufFvrsrIiIWDw2wrKcuLyWOcm2ZeXevmY9HOz2ZkIizp5axp6k8NC3Ry8eGdnJhVk0XCgB3cW03GADEq58nFg3659mIeGqdjoFzZVhaUFPPsqpQR0x3j8CCAAAJ/0lEQVR4nO2cC1fbOBbHpWtbWCRtmgdMoM4Y0m4LswQoISVAoDDdlpmWabbbfcx+/y+yV3ZCLdlJZOLM+Jy9v1MKSazr+9db8lUYIwiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIIj/OxzHqU4oxF6lokw5sVkHXxdidTmPKpXvv4qyOIH96QoLUzXFcVZ8g/xs7u52N5Du7u5mMRZf7HZf/uUH5OWr3dfFmMyJaiLxX3v7P/21d3DQjAjD3snhkVLpVJ18Oa+aHibDv46P3tSeXDXbEvGawcHUJDbIP7YwlTPdu14oQQKHCME5/tUO+2enkwtyGVS91N5hP2xwLpQhHplTtAe14dtHmFyCqGmc9Xyvo1RNEUL9CCG9oDZ8jNnzVgBCdLDwIGkVAf+gflGwiEXcBZJz13VhmtEx+B64+I4XHua1uL/jcYE1U6lDw+60CPGXeiG9/uUqhKSJuu+tNp8PuhTeW9artTWsoOcjWGASlbaw+jtrKxaonB5fgVzsD+ejDVuLp9ccpIVF2Fqxuoh31zbqVHcBjTu7Yjy7srKINQNUrq24xzkfcOFysdgd5ZAcXSiHZnfzDltjN9eeqtUWJl1XQNMy1x7NtozavSUuD4Zs7tjosI8DDmBXLSKgVVmlxlsvhy/KHdk+w9F6jsUjyxr6QAN2judaXIoWSJfnyXCl8W62PYcN21adVhJXDl6sTiDwXApBjdgo0cnM88oa22+oWp+j3qubCxhszq/7jxbI7T1JZHlDnqlZZRqHrTcfYxJ7sLDCqsUr3HqEPAXOcIbZEruBVZ+cYRH681v3oxjzvA3mO8GnLIubO3JBCc782OXFjv0VzK6f/fSkAxsQzpQ72DjdRqOhWgi2KDeeg2vASGV5slpVcP1Vkx3jwmiJghNtgEbDRxqTmXcnPeORY1ZdK2xBpVaDI5lWKIBL2Qj7Jx/ev3//tw8nvcDzlIOpCwGnW46hECuFzOpiQHphrX6/v3F5uX+oTGZWHQFXp+hXgW1xK2NUjhZKt0fH369696zWll5G3YPGuT5MO+xduyNSCvGN4OTyS+LC03FfArhmrcByvk5teCzDxzbwVDt0eRiPdZiXSHy/vXoTzFqKOmBQ0RRW2bWqgKnrmnex/onJ6Npuy4NOKiuE96zIzqYvDWckCAjqmdfu1Tyeyg4XtnV/hl6qsWKn+0v27buhGgjNBOFNcbO3YQMM89jaBhuZPbZaXgU4jpv+oz9JRqZF5Go9+/a4JPw13UgAM60w+qkyAVmrMCerITjVKvs0SnnPuebPGDsp0+PP77KHTbamcq2Rlmhk2hKs+7pCQIH1WRP8aNvs5rM0Gi52fskUPV0hzgV5SxVW5q5ytBF33k5L3C6kmlbUdE3D5R15wmbkd4TDnu+Y3gh+P+ne8ee39BDQn++GmqQbFiWEBa2jLpqGM0IucEclujJajkANznQy2TIUdiD8Mt8esq1bxFfSbp9kAVW0bJZH+JwtHGyH+lCNsx//VVzuVbZ3ZZpsz+hkNPp6KlfIW2yjBZTi52THqDYL/QULdxZVnlt9PMAXb+Ix2mFnyTaoxgGc81jsoe0FegeMA1ZlcVZb2G0kzeJMS9asngd9CY1y4iFbq0QKW6lPbiwccdidOcTIoyKe3GxrZtVI/9KmfTts25y+BcdxzrwOktXNjUY2i+kJ3tSs3VAvogxPNIU4W6rN60YT/lTMQvTuYyFdPzkJc7kX2u28OGzLyDQYWPmygIE2P3EFtkKb1l1ZY1+5sdCox0IOITlUYq2YObiaHDeFq/Woweby48Vxo5NUCMJ+JvFSGgr7scIW1xW2f7P2psd1he3h8gq7oCuEE8uEeOdves8AYdxmdrSlGOaZrS84ckmRTCvk4fIKx7pC4f3TLt2aU2VfDYXBafTRgRSawr7tMqjKfvSE5o1fX17hB9BrWtC1T/uGa21YNKO0f2/qXqrtRluLb40h0a3ZDKTz+Sp1hWGOh/X70lB4pN592uRu0mRznKMcBvrMjfeWL8PfjTK0bjRMdTW6Qv9evfvUF5pCbz2Hl591i/xJXj1pllG4q89NvytMvptPYQuSe4xCPPlHXkEpllF4/E1fI8qol3rq6Rb99RxtqaU9VcAyfJtXUIrlFBp9ygoU5tWT5usSCj/5WSNNgQo7RSisG5PdYNc+7ZExLnhRFMqSCrlRhkv3pdugPz5o/2Cf9id9WODNaE1eNoXroM+84V+2KR12YuxGxU9oyqbw1AgtETW7dMrpb5ltuGwKXwfajrorsh+VpXHYpbHL2ulH7iylsMZF0QrZZ70/tJ7OO7g+NBb59WiNXzqFv+p+Cugxu7jdzQNdH4dn5VS4D/oKWHj/ttkcqbI7z1DY2Cynwpsr89FWj9nt/SUVqqehk9G5dApZzdzggjkhMslk2h4d/ruPvSmbwgob+kaHAU2LUM8zTxi7kM2bcip02JcDXSF2p3N3o5wKOvwfXIxrT5cETHchy6YQu4xb7F40kdLbmX2946CQj6lwNQFHkwtKqPCibeymg+f1b2Zc7qiIym5ohlC4cjS9omwKK06VnUAn1duEM6Y2KoZtvZmKx3NhXGaFF4E0+kUhIDiLDlaoQO3JOR6nGj/CrRuhQFE4+s6DxbIpjNjKiCtwZT9aDE11YX2OepLhICt60Tt/cKWUCithKrhCPWZu1jbivcUHD1/c9/x0XAhX8T0PlFIhG3pphSoArT2qH013uyqv9n8JJaTaLCInu90lVoiLWZEV94X/tQ+e9H5H+jtX6oCQ4MK8ToA/TpgqqcLKiM+IV1bRieoTKWfF2wPcJk2VVCEOijMUqihm6HSkSMWpPSgcaZZKqrBqBlckbiPUg2oQMw4VuPxAjyQpq0KHHXrG5M0OaJ7qpkqqUD3Y3m6k4jwX64O2GdZTWoWRxLyF6PKrVNxSSRXGQYfjRcfyUozSJyNLqzCaufz3wPaQUnROBK6P02ZKrFDx+ho8q4M8asbTyDwzUGqFahlxFng2pyFRYJh9WLDUCqNw3b3W5MTvjAqrzkyoIxOz9quWVGg+XVvJSb2NaxndZ2aTBBnczgwYfSq1HZxlnx+uQiHaXG+psNrMaRp6AOHtnIcbGQrt+UMUxpG+F3c7QaoIVffpB/2zucc8n8qOWUvtUQrdB1Q7XMFpS7Wlr8b/zY16P1Ad66Qk8ZffHPUPoxFwTnDfj4Hve/IBz+/mKIctwMQP+H5reT3zOb0c12tPejuK/smb4caNeneBw0d1jfM8N7wZjp8lGD5/tOsWZB63iD+Ym67Y7wxY9bdlxF9KMr1ZFMVdXRTT6ky+QeiBPDd0tLR//nfXEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEKvif7MqsYoWxjCgAAAAAElFTkSuQmCC)`,
                        backgroundSize:'100% 100%',
                        // boxSizing:'border-box'
                    }}
                ></div>
                <div className="Home2ImageModalContent">
                    <div className="Home2ImageModal2ContentUser1111">
                        <div className="d110">
                            <img src="https://img1.yna.co.kr/etc/inner/KR/2020/10/26/AKR20201026050600017_03_i_P2.jpg" className="Home2avatarImage" />
                            {data.mnickname}
                        </div>
                        <div>

                        </div>
                        <div className="d112">
                            <i class="far fa-sticky-note"  onClick={create_memo}></i>
                        </div>
                        {/* <i class="far fa-sticky-note" className="d112" onClick={create_memo}></i> */}
                        {/* <button className="d112" onClick={create_memo}>쪽지로 이동</button> */}
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
                        {data.tlcplace} / {data.tlcdate}
                    </div>
                    <div className="Home2ImageModalContentEmotion">
                        <i class="far fa-smile"  style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-angry"  style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-laugh-squint"  style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-laugh-squint"  style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-surprise"  style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-sad-tear" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-grin-hearts" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
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
                    <div className="d112">
                        <i class="far fa-sticky-note"  onClick={create_memo}></i>
                    </div>
                    {/* <button className="d112" onClick={create_memo}>쪽지로 이동</button> */}
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
                        {data.tlcplace} / {data.tlcdate}
                    </div>
                    <div className="Home2ImageModal2ContentEmotion">
                        <i class="far fa-smile" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-angry" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-laugh-squint" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-laugh-squint" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-surprise" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-sad-tear" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
                        <i class="far fa-grin-hearts" style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}></i>
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
                    backgroundImage: `url(data:image/png;base64,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)`,
                    backgroundSize:'cover',
                    width:'100%',
                    height:'100%',
                    boxSizing:'border-box'
                }}>
                </div> :
                <div className='Home2CardImageOnImage2'
                
                onMouseLeave={()=>setIsListHover(true)}
                style={{
                    backgroundImage: `url(data:image/png;base64,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)`,
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