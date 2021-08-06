import React , {useState} from 'react'
import axios from 'axios'
import { config } from '../../shared/config'
import { history } from "../../redux/configureStore";
import './CreateTimeLineContent.css'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '330px',
      },
    },
    roott: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '980px',
          padding: 0,
          height:'180px'
        },
      },
    roots: {
        '& > *': {
          margin: theme.spacing(1),
          width:'280px',
          height:'56px',
        },
      },
  }));

function CreateTimeLineContent () {
    const classes = useStyles();
    const [tltitle , setTltitle] = useState("")
    const [tlcategory , setTlCategory] = useState("")
    const [tlintroduce , setTlintroduce] = useState("")
    const [tlpubyn , setTlpubyn] = useState("Y")
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    const onTitle = (e) =>{
        setTltitle(e.target.value)
    }

    const onCategory = (e) =>{
        setTlCategory(e.target.value)
    }

    const onIntroduce = (e) =>{
        setTlintroduce(e.target.value)
    }

    const onClick = () =>{
        if (tltitle === "" || tlcategory ==="" || tlintroduce === ""){
            alert('입력사항들을 입력해주세요')
        }else{

            const data = {
                tltitle:tltitle,
                tlcategory:tlcategory,
                tlintroduce:tlintroduce,
                tlpubyn:tlpubyn,
            }

            try{
                const res = axios.post(`${url}/timeline/createtime`,data,token)
                console.log('res',res)
                history.push({
                    pathname: `/main/home2`,
                    })
            }catch (err){
                console.log(err)
            }
        }
    }

    return(
        <div className="CreateTimeLineContent">
            <div className="CTC_1">
                <div className="CTC_input1">
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField onChange={onTitle} id="outlined-search" label="timeline" type="search" variant="outlined" />
                            <TextField onChange={onCategory} id="outlined-search" label="category" type="search" variant="outlined" />
                        </div>
                    </form>            
                </div>
                <div className="CTC_input2">
                    <div className={classes.roots}>
                        <Button onClick={onClick} variant="contained" color="primary">
                            타임라인 생성하기
                        </Button>
                    </div>
                </div>
            </div>
            <div className="CTC_2">
                <form className={classes.roott} noValidate autoComplete="off">
                    <div>
                        <TextField
                            onChange={onIntroduce}
                            id="outlined-multiline-static"
                            label="introduce"
                            multiline
                            rows={7}
                            variant="outlined"
                            />
                    </div>
                </form>            
            </div>
            
        </div>
    )
}

export default CreateTimeLineContent