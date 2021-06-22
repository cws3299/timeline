import { setCookie , deleteCookie , getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import Swal from "sweetalert2";
// import welcome from "../../images/welcome.png";
import { useDispatch } from "react-redux";

// 액션 타입
const SET_USER = "SET_USER"; // 로그인
const GET_USER = "GET_USER"; // 유저 정보 불러오기
const LOG_OUT = "LOG_OUT"; // 로그아웃
const DELETE_USER = "DELETE_USER"; //회원 탈퇴

// 액션 생성함수
const setUser = createAction(SET_USER, () => ({}));
const getUser = createAction(GET_USER, (username) => ({ username }));
const logOut = createAction(LOG_OUT, () => ({}));
const deleteUser = createAction(DELETE_USER, () => ({}));


// 초기값
const initialState = {
    user: " ",
    is_login:false,
}

const loginSV = (username, pwd) =>{
    return function(dispatch,getState,{history}){
        axios({
            method:"POST",
            url:`${config.api}auth/authenticate?username=${username}&password=${pwd}`,

            // data:{
            //     username:username,
            //     password:pwd,
            // },
        })
        .then(async (res) => {
            const TOKEN= res.data.token;
            
            // 쿠키에 Token저장
            await setCookie("is_login",TOKEN);

            await localStorage.setItem("token", TOKEN)

            // accessToken 디폴트 설정
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${TOKEN}`;

            const state = getState().user.is_login;


            dispatch(setUser());
            await history.push("/main/post");
        })
        .catch((err) =>{
            console.log("로그인 에러",err)
        });
    };
};


// 회원가입
const signUpSV = (email, nickname, pwd, pwdCheck) => {
    return function (dispatch, getState, { history }) {
      axios({
        method: "POST",
        url: `${config.api}/signup`,
        data: {
          email: email,
          password: pwd,
          passwordCheck: pwdCheck,
          username: nickname,
        },
      })
        .then((res) => {
          Swal.fire({
            position: "center-right",
            icon: "success",
            title: "회원가입이 완료되었습니다",
            showConfirmButton: false,
            timer: 1400,
          });
          history.replace("/login");
          
        })
        .catch((err) => {
          console.log("회원가입 에러", err);
        });
    };
  };

// 이메일로 인증번호 전송
// const SendAuth = (email) => {
//     return function (dispatch, getState, { history }) {
//       axios({
//         method: "POST",
//         url: `${config.api}/email/certification/send`,
//         data: {
//           email: email,
//         },
//       })
//         .then((res) => {
//           Swal.fire({
//             icon: "success",
//             title: "입력하신 이메일로 인증번호가 발송되었습니다.",
//             showConfirmButton: false,
//             timer: 1400,
//           });
//         })
//         .catch((err) => {
//           console.log("인증번호 발송 에러", err);
  
//           Swal.fire({
//             title: "이미 가입된 이메일 입니다",
//             icon: "info",
//             showConfirmButton: false,
//             timer: 1400,
//           });
  
//           document.getElementById("userauth").disabled = false;
//           // 이미가입된 이메일이면 인증번호 전송 계속 해야하니 버튼 활성화
//         });
//     };
//   };
  
  // 이메일인증번호 인증완료
//   const ConfirmAuth = (email, AuthNum) => {
//     return function (dispatch, getState, { history }) {
//       axios({
//         method: "POST",
//         url: `${config.api}/email/certification/confirm`,
//         data: {
//           email: email,
//           certificationNumber: AuthNum,
//         },
//       })
//         .then((res) => {
//           Swal.fire({
//             icon: "success",
//             title: "인증되었습니다.",
//             showConfirmButton: false,
//             timer: 1400,
//           });
  
//           let check = true;
//           dispatch(authCheck(check));
//         })
//         .catch((err) => {
//           console.log(err);
//           Swal.fire({
//             icon: "error",
//             title: "인증이 실패했습니다.",
//             text: "유효시간 3분이 지났거나 인증번호가 잘못되었습니다.",
//             confirmButtonText: "확인",
//           });
//         });
//     };
//   };
  
  // 유저 정보 불러오기
//   const getUserSV = () => {
//     return function (dispatch, getState, { history }) {
//       const ACCESS_TOKEN = localStorage.getItem("token");
  
//       axios({
//         method: "GET",
//         url: `${config.api}/username`,
//         headers: {
//           Authorization: `Bearer ${ACCESS_TOKEN}`,
//         },
//       })
//         .then((res) => {
//           dispatch(getUser(res.data));
//         })
//         .catch((err) => {
//           console.log("유저 이름 가져오기 에러", err);
//         });
//     };
//   };
  
  // 닉네임 중복 체크
//   const userNameCheck = (nickname) => {
//     return function (dispatch, getState, { history }) {
//       axios({
//         method: "GET",
//         url: `${config.api}/username/${nickname}`,
//       })
//         .then((res) => {
//           res.data
//             ? Swal.fire({
//                 icon: "error",
//                 title: "중복된 닉네임 입니다.",
//                 showConfirmButton: false,
//                 timer: 1400,
//               })
//             : Swal.fire({
//                 icon: "success",
//                 title: "사용가능한 닉네임 입니다.",
//                 showConfirmButton: false,
//                 timer: 1400,
//               });
  
//           dispatch(nameCheck(res.data));
//         })
//         .catch((err) => {
//           console.log("닉네임 중복검사 오류", err);
//         });
//     };
//   };
  
  // 비밀번호 찾기화면
  // 이메일 인증번호 발송
//   const sendPwdAuth = (email) => {
//     return function (dispatch, getState, { history }) {
//       axios({
//         method: "POST",
//         url: `${config.api}/email/certification/send/reset`,
//         data: {
//           email: email,
//         },
//       })
//         .then((res) => {
//           if (res.data === "The email does not exist !") {
//             Swal.fire({
//               title: "가입되지 않은 이메일입니다.",
//               icon: "info",
//               showConfirmButton: false,
//               timer: 1400,
//             });
//             // 이미가입된 이메일이면 인증번호 전송 계속 해야하니 버튼 활성화
//             document.getElementById("auth").disabled = false;
//           } else {
//             Swal.fire({
//               icon: "success",
//               title: "입력하신 이메일로 인증번호가 발송되었습니다.",
//               showConfirmButton: false,
//               timer: 1400,
//             });
//           }
//         })
//         .catch((err) => {
//           console.log("인증번호발송 에러", err);
//         });
//     };
//   };
  
  // 비밀번호 재설정
//   const changePwd = (email, pwd, pwdCheck) => {
//     return function (dispatch, getState, { history }) {
//       const data = { email: email, password: pwd, passwordCheck: pwdCheck };
//       axios
//         .put(`${config.api}/setting/password`, data)
//         .then((res) => {
//           Swal.fire({
//             icon: "success",
//             title: "비밀번호가 변경되었습니다.",
//             showConfirmButton: false,
//             timer: 1400,
//           });
//           history.replace("/login");
//         })
//         .catch((err) => {
//           console.log("비밀번호 재설정 에러", err);
//         });
//     };
//   };
  
  // 회원 탈퇴
//   const deleteUserSV = () => {
//     return function (dispatch, getState, { history }) {
//       axios
//         .delete(`${config.api}/withdrawal/membership`)
//         .then(async () => {
//           await dispatch(deleteUser());
//           await Swal.fire({
//             title: "정상 처리 되었습니다.",
//             text: "이용해주셔서 감사합니다.",
//             icon: "success",
//             confirmButtonText: "확인",
//           });
//           await history.replace("/login");
//         })
//         .catch((err) => {
//           console.log("회원탈퇴 에러", err);
//         });
//     };
//   };
  
  // 마이페이지
  // username 변경
//   const changeUsernameSV = (username) => {
//     return function (dispatch, getState, { history }) {
//       const data = {
//         username: username,
//       };
//       axios
//         .put(`${config.api}/setting/username`, data)
//         .then(() => {
//           Swal.fire({
//             title: "닉네임이 변경되었습니다.",
//             icon: "success",
//             showConfirmButton: false,
//             timer: 1400,
//           });
//           dispatch(changeName(username));
//           // 닉네임 변경 적용을 위해 새로고침
//           // history.go(0);
//         })
//         .catch((err) => {
//           console.log("닉네임변경 에러", err);
//         });
//     };
//   };
  
  // 마이페이지
  // 비밀번호 변경
//   const changePwdSV = (password, passwordCheck) => {
//     return function (dispatch, getState, { history }) {
//       const data = { password: password, passwordCheck: passwordCheck };
//       axios
//         .put(`${config.api}/setting/password/new`, data)
//         .then(async () => {
//           Swal.fire({
//             title: "비밀번호가 변경되었습니다.",
//             text: "다시 로그인 해주세요.",
//             icon: "success",
//             confirmButtonText: "확인",
//           });
//           await dispatch(logOut());
//           await history.replace("/login");
//         })
//         .catch((err) => {
//           console.log("비밀번호 변경 오류", err);
//         });
//     };
//   };
  
  // 리듀서
  export default handleActions(
    {
      [SET_USER]: (state, action) =>
        produce(state, (draft) => {
          // draft.user = action.payload.user;
          draft.is_login = true;
        }),
  
      [GET_USER]: (state, action) =>
        produce(state, (draft) => {
          draft.user = action.payload.username;
          draft.is_login = true;
        }),
  
      [LOG_OUT]: (state, action) =>
        produce(state, (draft) => {
          // 쿠키삭제
          deleteCookie("is_login");
          // 로컬 삭제
          localStorage.clear();
          draft.is_login = false;
        }),
  
    //   [NAME_CHECK]: (state, action) =>
    //     produce(state, (draft) => {
    //       draft.name_check = action.payload.name_check;
    //     }),
  
    //   [NAME_CHANGE]: (state, action) =>
    //     produce(state, (draft) => {
    //       draft.user = action.payload.name;
    //     }),
  
    //   [AUTH_CHECK]: (state, action) =>
    //     produce(state, (draft) => {
    //       draft.auth_check = action.payload.auth_check;
    //     }),
  
    //   [DELETE_USER]: (state, action) =>
    //     produce(state, (draft) => {
    //       // 쿠키삭제
    //       deleteCookie("is_login");
    //       // 로컬 삭제
    //       localStorage.clear();
    //       draft.is_login = false;
    //     }),
    },
    initialState
  );
  
  const actionCreators = {
    setUser,
    logOut,
    signUpSV,
    loginSV,
    // extensionAccess,
    // kakaoLogin,
    // SendAuth,
    // ConfirmAuth,
    // getUserSV,
    // userNameCheck,
    // nameCheck,
    // changePwd,
    // sendPwdAuth,
    // deleteUserSV,
    // deleteUser,
    // changeUsernameSV,
    // changePwdSV,
    // changeName,
  };
  
  export { actionCreators };