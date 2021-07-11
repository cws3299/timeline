import React, {useState} from'react'
import './Home2Card.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 500,
      height:400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Home2Card({props}){
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(props)

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const [isListHover, setIsListHover] = useState(true);
    const [isListHover2, setIsListHover2] = useState(true);
    const place = props.tlcplace

    const body = (
        <div style={modalStyle} className={classes.paper}>
            {data.tlccontent}
        </div>
      );

    if (props.tlcimage === null){
        return(
            <div className="Home2Card"

            >
                {
                isListHover2 ?
                <div className='Home2CardImageOffImage1'
                onMouseEnter={()=>setIsListHover2(false)}
                style={{
                    width:'100%',
                    height:'100%',
                    boxSizing:'border-box',
                    backgroundColor:'black',
                    color:'white',
                }}>
                    {props.tlccontent}
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
                    >
                        {place}
                    </div>
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

export default Home2Card;