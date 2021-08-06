import React, {useState , useEffect , useCallback ,useRef} from 'react'
import './PostContent.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { config } from '../../shared/config'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import "moment/locale/de";
import LinesEllipsis from 'react-lines-ellipsis'
import { history } from "../../redux/configureStore";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 900,
      width:900,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));



  

function PostContent() {
    const dateInput = useRef();
    const placeInput = useRef();
    const [timelines , setTimelines] = useState([])
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    const goTimeline = ({props}) => {
      console.log('props',props)
      history.push({
        pathname: `/post/list/${props}`,
        })
    } 

    const sendQuery = useCallback(async () =>{
        try{
            const res = await axios.post(`${url}/timeline/list`,null,token)
            console.log('res',res)
            await setTimelines((prev) => [...prev, ...res.data])
        }catch (err){
            console.log(err)
        }

    },[])

    useEffect(() => {
        sendQuery();
      }, []);

    const classes = useStyles();
    const [fileUrl, setFileUrl] = useState(null);
    const [choice_timeline_idx, setChoiceIdx] = React.useState(0)
    const [tlcdate, setTlcdate] = React.useState('')
    const [tlcplace, setTlcplace] = React.useState('')
    const [tlcimage, setTlcimage] = React.useState(null)
    const [tlccontent, setTlccontent] = React.useState('')
    // const [tlcemotion, setTlcemotion] = React.useState('')
    // const [tlcpubyn, setTlcpubyn] = React.useState('')
    const [tlctag, setTlctag] = React.useState('')


    const onChange = (e) => {
      setTlcimage(e.target.files[0]);
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl)
    }
  
    const onClick = async () => {
      const formData = new FormData();
      formData.append('tlcdate', tlcdate)
      formData.append('tlcplace', tlcplace)
      formData.append('tlccontent', tlccontent)
      // formData.append('tlcemotion', null)
      formData.append('tlcpubyn', "Y")
      formData.append('tlctag', tlctag)
      formData.append('tlcimage', tlcimage);
      console.log(formData)
      console.log(tlcimage)
      // 서버의 upload API 호출
      const res = await axios.post(`${url}/post/writepost/${choice_timeline_idx}`, formData, token)
      // .then(()=>{
      //   goTimeline(choice_timeline_idx)
      // }).catch(()=>{
      //   alert('날짜 확인 버튼을 한 번 더 눌러주세요')
      // })
    }

    const [state, setState] = React.useState('');

  
    const handleChange = (event) => {
      const name = event.target.name
      setChoiceIdx(event.target.value);
      setState(event.target.value)
      console.log(choice_timeline_idx)
    };

    const dateChange = async() =>{
      await setTlcdate(dateInput.current.state.value)
      console.log('start',tlcdate)
      let tl = ''
      if (tlcdate.length == 8){
        tl += tlcdate.slice(0,5)
        tl += '0'
        tl += tlcdate.slice(5,7)
        tl += '0'
        tl += tlcdate.slice(7,9)
      }else if(tlcdate.length == 9){
        if (tlcdate[5] === '1'){
          tl += tlcdate.slice(0,7)
          tl += '0'
          tl += tlcdate.slice(7,9)
        }else{
          tl += tlcdate.slice(0,5)
          tl += '0'
          tl += tlcdate.slice(5,9)
        }
      }else{
        setTlcdate(dateInput.current.state.value)
      }

      console.log('-----',tl)
      if (tl.length === 10){
        setTlcdate(tl)
      }

      console.log('++',tlcdate)

    }

    const placeChange = (e) =>{
      setTlcplace(e.target.value)
    }

    const ContentChange = (e) => {
      setTlccontent(e.target.value)
    }

    const TagChange = (e) => {
      setTlctag(e.target.value)
    }
    return(
        <div className = "PostContent">
          <div className="PostContent1">
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                native
                value={state.age}
                onChange={handleChange}
                label="Age"
                inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                }}
                >
                {
                    timelines.map((timeline,i) => (
                        <option value = {timeline.tlidx} key={i} props={timeline.tlidx} 
                        onClick={() => (setChoiceIdx(timeline.tlidx))}>
                                {timeline.tltitle}
                                {timeline.tlidx}
                        </option>
                    ))
                }
                </Select>
            </FormControl>
            <button className="PostButton1" onClick={onClick}>제출</button>
          </div>
          <div className="PostContent2">
            <div className = "PostContentContent">
                <div className = "PostContentDate">
                  <input className="PostContentPlaceInput" onChange={placeChange} placeholder="장소를 입력해주세요"></input>
                  <DayPickerInput ref={dateInput} value="DD/MM/YYYY" placeholder="DD/MM/YYYY" format="DD/MM/YYYY"/>
                  <button className = "PostContentButton" onClick={dateChange}>날짜 확인</button>
                </div>
                <div className = "PostContentContentContent">
                  <textarea className = "PostContentContentContentText" onChange={ContentChange} placeholder="내용을 입력해주세요" />
                </div>
                <div className = "PostContentTag">
                  <input className="PostContentTagInput" onChange={TagChange} placeholder="#태그1#태그2"></input>
                </div>
            </div>
            <div className = "PostContentImage">
              <div className = "PostContentImage1">
                <img className = "PostContentImage11" src={fileUrl}>
                </img>
              </div>
              <div className = "PostContentImage2">
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
            </div>
          </div>
        </div>
    )
}

export default PostContent;