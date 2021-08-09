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
const SET_SEARCH_FEED2 = "SET_SEARCH_FEED2"

const setSearchFeed2 = createAction(SET_SEARCH_FEED2, (items)=>({items}));

const initialState = {
    searchfeed2 : "",
}

const setsearchFeedSV2 = (items) =>{
    return function (dispatch){
        dispatch(setSearchFeed2(items));
    }
    }

export default handleActions(
    {
        [SET_SEARCH_FEED2]:(state,action) => 
            produce(state,(draft) => {
                draft.searchfeed = action.payload.items;
            })
    },
    initialState
);

const actionCreators = {
    setSearchFeed2,
    setsearchFeedSV2,
  };
  
export { actionCreators };