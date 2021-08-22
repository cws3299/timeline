import React , {useState,useRef} from 'react'
import './TimeCapsuleCreateContent.css'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import Button from '@material-ui/core/Button';
import { config } from '../../shared/config'
import axios from 'axios';
import { history } from "../../redux/configureStore";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '700px',
      },
    },
    roots: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '980px',
        },
      },
    rootss: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '800px',
        height: '50px',
    },
    },
    submit: {
        '& > *': {
          margin: theme.spacing(1),
          width: '150px',
          height: '50px',
        },
      },
  }));

  function TimeCapsuleCreateContent() {
    
    const goTimeCapsule = () => {
      console.log('-----')
      history.push({
        pathname: '/main/TimeCapsule',
        })
    } 

    const [tcterm , setTcterm] = useState('')
    const [tctitle , setTctitle] = useState('')
    const [tccontent , setTccontent] = useState('')
    const [tcthink , setTcthink] = useState('')

    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    const dateInput = useRef();
    const classes = useStyles();

    const onClick = async () => {


        const capsule = {
            tcterm : tcterm,
            tctitle : tctitle,
            tccontent : tccontent,
            tcthink : tcthink,
        }
        
        const res = await axios.post(`${url}/timecapsule/write`, capsule, token)
        .then(() => {
          goTimeCapsule()
        }
        ).catch(() => {

          alert('날짜 확인 버튼을 한 번 더 눌러주세요')
        }
        )
          
  
        
      }

    const thinkChange = (e) => {
        setTcthink(e.target.value)
    } 

    const contentChange = (e) => {
        setTccontent(e.target.value)
    }

    const titleChange = (e) => {
        setTctitle(e.target.value)
    }

    const dateChange = async() =>{
      console.log(dateInput)
        await setTcterm(dateInput.current.state.value)
        console.log('start',tcterm)
        let tl = ''
        if (tcterm.length == 8){
          tl += tcterm.slice(0,5)
          tl += '0'
          tl += tcterm.slice(5,7)
          tl += '0'
          tl += tcterm.slice(7,9)
        }else if(tcterm.length == 9){
          if (tcterm[5] === '1'){
            tl += tcterm.slice(0,7)
            tl += '0'
            tl += tcterm.slice(7,9)
          }else{
            tl += tcterm.slice(0,5)
            tl += '0'
            tl += tcterm.slice(5,9)
          }
        }else{
            setTcterm(dateInput.current.state.value)
        }
  
        console.log('-----',tl,tl.length)
        if (tl.length === 10){
            await setTcterm(tl)
        }
  
      }

    return(
        <div className = "TimeCapsuleCreateContent">
            <div className = "TimeCapsuleCreateContent1">
                <form className={classes.root} style={{width:'750px', margin:'0' ,display:'inline-block'}} noValidate autoComplete="off">
                    <div className="TimeCapsuleCreateContentTitle">
                        <TextField onChange={titleChange} id="outlined-search" placeholder="타임캡슐의 이름을 정해주세요" type="search" variant="outlined" />
                    </div>
                </form>
                <div className="TimeCapsuleCreateContentDate" style = {{width:'250px', height:'100%' , margin:'0' ,display:'inline-block'}}>
                    <div className="TimeCapsuleCreateContentDate2" style = {{position:'relative', width:'100%', height:'100%' , margin:'0'}}>
                        <DayPickerInput ref={dateInput} value="DD/MM/YYYY" placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
                        <button className = "TimeCapsuleCreateContentTime" onClick={dateChange} >날짜 확인</button>
                    </div>
                </div>
            </div>
            <div className = "TimeCapsuleCreateContent2">
                <form className={classes.roots} noValidate autoComplete="off">
                    <div>
                        <TextField
                            onChange = {contentChange}
                            id="outlined-multiline-static"
                            multiline
                            rows={23}
                            placeholder="내용을 입력해주세요"
                            variant="outlined"
                            />
                    </div>
                </form>
            </div>
            <div className = "TimeCapsuleCreateContent3">
                <div className="sss">
                  <form className={classes.rootss} style={{width:'800px', margin:'0' ,display:'inline-block'}} noValidate autoComplete="off">
                      <div className="TimeCapsuleCreateContentThink">
                          <TextField onChange={thinkChange} id="outlined-search" placeholder="마지막으로 미래의 자신에게 한마디 해주세요" type="search" variant="outlined" />
                      </div>
                  </form>
                </div>
                <div className="kkk">
                  <div className={classes.submit}  style = {{position:'relative' , width:'200px', height:'100%' , margin:'0' ,display:'inline-block' ,textAlign:'center'}}>
                      <Button onClick={onClick} className = "TimeCapsuleCreateContentSubmit3" variant="contained" color="primary">
                          타임캡슐 묻기
                      </Button>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default TimeCapsuleCreateContent;