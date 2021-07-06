import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { rest } from "lodash-es";
import { history } from "../configureStore";

const SET_TIMELINE = "SET_TIMELINE";

const setTimeline = createAction(SET_TIMELINE, ()=>({}))

const initialState = {

}

const _token = localStorage.getItem("token");
  let token = {
    headers: { Authorization: `Bearer ${_token}` },
  };

const url = config.api

const createTL = (tltitle,tlcategory,tlintroduce,tlpubyn) => {

    const body = {
        'tltitle':tltitle,
        'tlcategory':tlcategory,
        'tlintroduce':tlintroduce,
        'tlpubyn':tlpubyn
    }
    
    return function (dispatch,getState){
        try{
            const res = axios.post(`${url}/timeline/createtime`,body,token)
            console.log(res)
            console.log(body,'---- title이 제대로 안들어감')
        }catch(err){
            console.log(err)
        }
    }
}

export default handleActions(
    {
        [SET_TIMELINE]: (state,action) => 
            produce(state,(draft)=>{
            
            }),
    },
    initialState
);

const actionCreators = {
    createTL
};

export { actionCreators };