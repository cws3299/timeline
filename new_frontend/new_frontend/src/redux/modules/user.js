import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { rest } from "lodash-es";

// 액션 타입 생성
const SET_USER = "SET_USER"; // 로그인
// const GET_USER = "GET_USER"; // 유저 정보 불러오기

// 액션 생성함수
const setUser = createAction(SET_USER, () => ({}));
// const getUser = createAction(GET_USER, (username) => ({ username }));

// 초기값
const initialState = {
    user: " ",
    is_login: false,
    name_check: false,
    auth_check: false,
  };

  const loginSV = (email, pwd) => {
      return function (dispatch, getState, { history }) {
        console.log(config.api,'000000')

      axios({
        method: "POST",
        url: `${config.api}/auth/authenticate?username=${email}&password=${pwd}`,
      })
        .then(async (res) => {
          console.log(res)
          const token = res.data.token
          console.log('------------------------------------------------------------------',token)
  
          await setCookie("is_login", token);
  
          await localStorage.setItem("token", token);
  
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
  
          dispatch(setUser());
          await history.push("/");
        })
        .catch((err) => {
          Swal.fire({
            position: "center-right",
            icon: "error",
            title: "로그인 실패",
            text: "회원정보를 정확히 입력해주세요.",
            showConfirmButton: false,
            timer: 1400,
          });
          console.log("로그인 에러", err);
        });
    };
  };


// 리듀서
export default handleActions(
    {
      [SET_USER]: (state, action) =>
        produce(state, (draft) => {
          // draft.user = action.payload.user;
          draft.is_login = true;
        }),
    },
    initialState
  );
  
  const actionCreators = {
    setUser,
    loginSV,
  };
  
  export { actionCreators };