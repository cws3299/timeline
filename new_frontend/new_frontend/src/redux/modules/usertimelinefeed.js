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
const USER_SET_TIME_FEED = "USER_SET_TIME_FEED"

const usersetTimeFeed = createAction(USER_SET_TIME_FEED, (items)=>({items}));

const initialState = {
    userfeed : [],
}

const usersettimeFeedSV = (items) =>{
    console.log('여기',items)
    return function (dispatch){
        dispatch(usersetTimeFeed(items));
    }
    }

export default handleActions(
    {
        [USER_SET_TIME_FEED]:(state,action) => 
            produce(state,(draft) => {
                draft.userfeed = action.payload.items;
            })
    },
    initialState
);

const actionCreators = {
    usersetTimeFeed,
    usersettimeFeedSV,
  };
  
export { actionCreators };