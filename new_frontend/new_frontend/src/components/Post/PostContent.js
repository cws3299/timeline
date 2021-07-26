import React, {useState , useEffect , useCallback} from 'react'
import './PostContent.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { config } from '../../shared/config'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 980,
      width:980,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  

function PostContent() {
    const [timelines , setTimelines] = useState([])
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

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
    const [choice_timeline_idx, setChoiceIdx] = React.useState(0)
    const [tlcdate, setTlcdate] = React.useState('')
    const [tlcplace, setTlcplace] = React.useState('')
    const [tlcimage, setTlcimage] = React.useState(null)
    const [tlccontent, setTlccontent] = React.useState('')
    const [tlcemotion, setTlcemotion] = React.useState('')
    const [tlcpubyn, setTlcpubyn] = React.useState('')
    const [tlctag, setTlctag] = React.useState('')


    const onChange = (e) => {
      setTlcimage(e.target.files[0]);
    }
  
    const onClick = async () => {
      const formData = new FormData();
      formData.append('tlcdate', '2021-07-26')
      formData.append('tlcplace', '전북대')
      formData.append('tlccontent', '개발은 어렵다')
      // formData.append('tlcemotion', null)
      formData.append('tlcpubyn', 'y')
      formData.append('tlctag', '#개발')
      formData.append('tlcimage', tlcimage);
      console.log(formData)
      console.log(tlcimage)
      // 서버의 upload API 호출
      const res = await axios.post(`${url}/post/writepost/${choice_timeline_idx}`, formData, token);
      console.log('rrrrrrr');
    }

    const [state, setState] = React.useState('');

  
    const handleChange = (event) => {
      const name = event.target.name
      setChoiceIdx(event.target.value);
      setState(event.target.value)
      console.log(choice_timeline_idx)
    };
    return(
        <div className = "PostContent">
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
            <input type="file" onChange={onChange}/>
            <button onClick={onClick}>제출</button>
        </div>
    )
}

export default PostContent;