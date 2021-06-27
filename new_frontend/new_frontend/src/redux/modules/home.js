import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { rest } from "lodash-es";
import { history } from "../configureStore";

const SET_FEED = "SET_FEED"

const setFeed = createAction(SET_FEED, (items)=>({items}));

const initialState = {
    homefeed : [],
}

const homeSV = (items) =>{
    return function (dispatch){
        dispatch(setFeed(items));
    }
    }

export default handleActions(
    {
        [SET_FEED]:(state,action) => 
            produce(state,(draft) => {
                draft.homefeed = action.payload.items;
            })
    },
    initialState
);

const actionCreators = {
    setFeed,
    homeSV,
  };
  
export { actionCreators };