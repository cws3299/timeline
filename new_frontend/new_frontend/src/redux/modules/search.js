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
const SET_SEARCH_FEED = "SET_SEARCH_FEED"

const setSearchFeed = createAction(SET_SEARCH_FEED, (items)=>({items}));

const initialState = {
    searchfeed : "",
}

const setsearchFeedSV = (items) =>{
    return function (dispatch){
        dispatch(setSearchFeed(items));
    }
    }

export default handleActions(
    {
        [SET_SEARCH_FEED]:(state,action) => 
            produce(state,(draft) => {
                draft.searchfeed = action.payload.items;
            })
    },
    initialState
);

const actionCreators = {
    setSearchFeed,
    setsearchFeedSV,
  };
  
export { actionCreators };