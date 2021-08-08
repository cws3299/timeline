import React from 'react'
import { history } from "../../redux/configureStore"
import './GoLetterContent.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '480px',
    },
    },
  }));

function GoLetterContent(data) {
    const classes = useStyles();
    console.log('data',data)

    const content = data.data.lcontent
    console.log('content',content)

    const back = () => {
        if (data.data.lidx_2 !== 0){
            history.push({
                pathname:"/main/BackLetter",
                state:{back_idx:data.data.lidx_2}
            })
        }else{
            history.push({
                pathname:'main/startFeed',
                state:{feed:data.data.tlcidx}
            })
        }
    }

    return(
        <div className="GoLetterContent">
            <div className="GoLetterContentInfo">
                <div style={{
                        backgroundImage:'url(data:image/png;base64,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)',
                        backgroundSize:'cover'
                    }}>
                </div>
                <div className="GoLetterContentInfoButton">
                    <Button  onClick={back} className="RLC_modalButton2" variant="contained" color="primary">
                        이전 편지 혹은 게시글로 이동
                    </Button>
                </div>
            </div>
            <div className="GoLetterContentContent">
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={30}
                            defaultValue={content}
                            variant="outlined"
                            />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default GoLetterContent;