import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { rest } from "lodash-es";
import { history } from "../configureStore";

// 액션 함수정의
const SET_TIME_FEED = "SET_TIME_FEED"

const setTimeFeed = createAction(SET_TIME_FEED, (items)=>({items}));

const initialState = {
    homefeed : [],
}

const settimeFeedSV = (items) =>{
    return function (dispatch){
        dispatch(setTimeFeed(items));
    }
    }

export default handleActions(
    {
        [SET_TIME_FEED]:(state,action) => 
            produce(state,(draft) => {
                draft.homefeed = action.payload.items;
            })
    },
    initialState
);

const actionCreators = {
    setTimeFeed,
    settimeFeedSV,
  };
  
export { actionCreators };