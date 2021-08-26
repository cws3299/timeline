import React ,{ useRef , useState }from 'react';
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";
import './Signup.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { config } from '../shared/config'
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    Input: {
      '& > *': {
        margin: theme.spacing(1),
        width: '450px',
      },
    },
    Name: {
        '& > *': {
          margin: theme.spacing(1),
          width: '450px',
        },
      },
    introduce: {
        '& > *': {
            margin: theme.spacing(1),
            width: '450px',
        },
    },
    birthday: {
        '& > *': {
            margin: theme.spacing(1),
            width: '450px',
        },
    },
    button: {
        '& > *': {
          display:'flex',
          justifyContent:'Center',
          alignItems:'center',
          width:'450px'
        },
      },

  }));



function Signup(){

    const goIntro = () => {
        history.push({
            pathname: "/intro/intro",
          })
    }

    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    const classes = useStyles()
    const [photo , setPhoto] = useState("")
    const [fileUrl, setFileUrl] = useState(null);
    const onChange = (e) => {
        setPhoto(e.target.files[0]);
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFileUrl(imageUrl)
    }
    const [mid, setMid] = useState("")
    const [mintroduce, setMintroduce] = useState("")
    const [mnickname, setMnickname] = useState("")
    const [mbirthday, setMbirthday] = useState("")
    const [mpwd, setMpwd] = useState("")
    const [mpwd2, setMpwd2] = useState("")

    const Change_id = (e) =>{
        setMid(e.target.value)
    }
    const Change_introduce = (e) =>{
        setMintroduce(e.target.value)
    }
    const Change_nickname = (e) =>{
        setMnickname(e.target.value)
    }
    const Change_birthday = (e) =>{
        setMbirthday(e.target.value)
    }
    const Change_mpwd = (e) =>{
        setMpwd(e.target.value)
    }
    const Change_mpwd2 = (e) =>{
        setMpwd2(e.target.value)
    }


    const onClick = async () => {
        if (mpwd === mpwd2){
            const formData = new FormData();
            formData.append('mid', mid)
            formData.append('mnickname', mnickname)
            formData.append('mbirthday', mbirthday)
            formData.append('mproduce', mintroduce)
            formData.append('mpwd', mpwd)
            if (photo !== ""){
                console.log('photo',photo)
                formData.append('mphoto', photo)
            }
            // console.log(mbirthday,mpwd)
            // console.log(formData)
            // 서버의 upload API 호출
            const res = await axios.post(`${url}/auth/signup`, formData)
            .then(()=>{
              alert("성공")
              goIntro()
            }).catch(()=>{
              alert('이미 존재하는 정보입니다.')
            })
        }else{
            alert('비밀번호 확인이 일치하지 않습니다.')
        }

      }


    return(
        <div className="Signup">
            <div className="SignupBox">
                <div className="SignupBoxIntro"> 
                    회원가입
                </div>
                <div className="SignupBoxId">
                    <form className={classes.Input} noValidate autoComplete="off">
                        <TextField id="outlined-basic" placeholder="아이디를 입력해주세요" variant="outlined" onChange={Change_id}/>
                    </form>
                </div>
                <div className="SignupBoxName">
                    <form className={classes.Name} noValidate autoComplete="off">
                        <TextField id="outlined-basic" placeholder="닉네임 입력" variant="outlined" onChange={Change_nickname} />
                    </form>
                </div>
                <div className="SignupBoxIntroduce">
                    <form className={classes.introduce} noValidate autoComplete="off">
                        <TextField id="outlined-basic" placeholder="자기소개 한 문장" variant="outlined"  onChange={Change_introduce}/>
                    </form>
                </div>
                <div className="SignupBoxBirthday">
                    <form className={classes.birthday} noValidate autoComplete="off">
                        <TextField id="outlined-basic" placeholder="생일 / (예시) 1993-12-09" variant="outlined" onChange={Change_birthday} />
                    </form>
                </div>
                <div className="SignupBoxPassword">
                    <form className={classes.birthday} noValidate autoComplete="off">
                        <TextField id="outlined-basic" placeholder="비밀번호 입력" variant="outlined" onChange={Change_mpwd} />
                    </form>
                </div>
                <div className="SignupBoxPasswordConfirm">
                    <form className={classes.birthday} noValidate autoComplete="off">
                        <TextField id="outlined-basic" placeholder="비밀번호 확인" variant="outlined" onChange={Change_mpwd2} />
                    </form>
                </div>
                <div className="SignupBoxFile">
                    <div style={{display:'flex' , justifyContent:'flex-start', alignItems:'center' , margin:'10px'}}> 프로필 사진 선택</div>
                    <div style={{display:'flex' , justifyContent:'center', alignItems:'center'}}>
                        <input type="file" id="ex_file" accept="image/*"  onChange={onChange}/>
                    </div>
                </div>
                <div className="SignupBoxButton">
                    <div className={classes.button}>
                        <Button variant="contained" onClick={onClick}>회원가입</Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Signup;

