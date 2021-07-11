import React , {useState, usestate} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './TimeLineCreateButton.css'
import styled  from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as timelineActions } from "../../redux/modules/timeline";

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
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TimeLineCreateButton() {
  const dispatch = useDispatch();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [tltitle,setTitle] = useState('')
  const [tlcategory,setCategory] = useState('')
  const [tlintroduce,setIntroduce] = useState('')
  const [tlpubyn,setPubyn] = useState('Y')

  const Swal = require("sweetalert2");

  const Createtl = () =>{
    if (tltitle === "" || tlcategory === "" || tlintroduce === "") {
      console.log('=====================================')
      Swal.fire({
        title: "제목 & 카테고리 & 소개글",
        text: "모두 입력해주세요",
        icon: "info",
      });
      return;
    }else{
      dispatch(timelineActions.createTL(tltitle,tlcategory,tlintroduce,tlpubyn))
      setTitle('')
      setCategory('')
      setIntroduce('')
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>

      <TLtitle placeholder="제목"
        value={tltitle}
        onChange = {(e)=>{
          setTitle(e.target.value)
        }}
      />
      <TLCategory placeholder="카테고리"
        value={tltitle}
        onChange = {(e)=>{
          setCategory(e.target.value)
        }}
      />
      <TLintroduce placeholder="소개"
        value={tltitle}
        onChange = {(e)=>{
          setIntroduce(e.target.value)
        }}
      />
      <TLpubyn />
      <CreateModalButton onClick={Createtl} > 만들기 </CreateModalButton>

    </div>
  );

  return (
    <div>
      <button className="TimeLineCreateButton" onClick={handleOpen}>
        <i class="fas fa-plus fa-5x"></i>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}


const TLtitle = styled.input`
    background-color: white;
    padding: 15px;
    border: 0.5px solid rgba(76, 76, 76, 0.3);
    border-radius: 10px;
    box-sizing:border-box;
    outline: none;
    font-size: 15px;
    font-weight: bold;
    color: black;
    opacity: 0.7;
    width: 100%;
`;

const TLCategory = styled.input`
    background-color: white;
    padding: 15px;
    border: 0.5px solid rgba(76, 76, 76, 0.3);
    border-radius: 10px;
    box-sizing:border-box;
    outline: none;
    font-size: 15px;
    font-weight: bold;
    color: black;
    opacity: 0.7;
    width: 100%;
`;

const TLintroduce = styled.input`
    background-color: white;
    padding: 15px;
    border: 0.5px solid rgba(76, 76, 76, 0.3);
    border-radius: 10px;
    box-sizing:border-box;
    outline: none;
    font-size: 15px;
    font-weight: bold;
    color: black;
    opacity: 0.7;
    width: 100%;
`;

const TLpubyn = styled.div`


`;

const CreateModalButton = styled.a`
  display: flex;
  width: auto;
  height: 50px;
  margin-top: 10px;
  background-color: rgba(74, 85, 102, 1);
  border: none;
  text-align: center;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-weight: 600;
`;

