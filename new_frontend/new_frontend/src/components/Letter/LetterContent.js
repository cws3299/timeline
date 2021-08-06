import React, {useState , useEffect , useCallback ,useRef} from 'react'
import './LetterContent.css'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { config } from '../../shared/config'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    roots: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '680px',
        },
      },
    root: {
    '& > *': {
        margin: theme.spacing(1),
        width: '280px',
    },
    },
    rootss: {
        '& > *': {
          margin: theme.spacing(1),
          width:'280px'
        },
      },
  }));

function LetterContent({props}) {

    const [content , setContent] = useState("")
    const [category , setCategory] = useState("")
    const [photo , setPhoto] = useState("")
    const [fileUrl, setFileUrl] = useState(null);

    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    const onChange = (e) => {
        setPhoto(e.target.files[0]);
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFileUrl(imageUrl)
      }

    const contentChange = (e) =>{
        setContent(e.target.value)
    }

    const chagneCategory = (e) =>{
        setCategory(e.target.value)
    }

    const onClick = async () => {
        const formData = new FormData();
        formData.append('lcontent', content)
        formData.append('lcategory', category)
        formData.append('lphoto', photo)
        // 서버의 upload API 호출
        const res = await axios.post(`${url}/mailbox/sending/?tlcidx=${props}`, formData, token)
        .then(()=>{
          alert("성공")
        }).catch(()=>{
          alert('날짜 확인 버튼을 한 번 더 눌러주세요')
        })
      }
    const classes = useStyles();
    console.log('000000000',props)
    return(
        <div className="LetterContent">
            <div className="LetterContent1">
                <form className={classes.roots} noValidate autoComplete="off">
                    <div>
                        <TextField
                            onChange = {contentChange}
                            id="outlined-multiline-static"
                            multiline
                            rows={30}
                            placeholder="편지내용을 입력해주세요"
                            variant="outlined"
                            />
                    </div>
                </form>
            </div>
            <div className="LetterContent2">
                <div className = "LetterContentImage1">
                    <img className = "LetterContentImage11" src={fileUrl}>
                    </img>
                </div>
                <div className = "LetterContentImage2">
                    {/* <input className = "PostContentImage22" type="file" accept="image/*" onChange={onChange}/> */}
                    <div className="filebox">
                        <label for="ex_file">
                        <div className="fileboxInput">
                            사진 업로드
                        </div>
                        </label>
                        <input type="file" id="ex_file" accept="image/*" onChange={onChange}/>
                    </div>
                </div>
                
                <div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField onChange={chagneCategory} id="outlined-basic" label="Outlined" variant="outlined" />
                    </form>
                </div>
                <div className={classes.rootss}>
                    <Button onClick={onClick} variant="contained" color="primary">
                        편지 보내기
                    </Button>
                </div>

            </div>
        </div>
    )
};

export default LetterContent;