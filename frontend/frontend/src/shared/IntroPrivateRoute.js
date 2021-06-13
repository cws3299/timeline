import React from "react";
import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";

// 로그인 없이 접근할 경우 인트로 화면으로 리다이렉트

function IntroPrivateRoute({ component: Component, ...parentProps}){
    const status = localStorage.getItem("token");
    console.log('---',status)

    // 토큰이 있다는 이야기 == 로그인
    // 토큰이 있으면 redirect main의 post로 redirect
    // 토큰이 없으면 들어가짐
    const is_login = status === null ? true : false;
    return (
        <Fragment >
            <Route 
                {...parentProps}
                render = {(props) => 
                is_login ? <Component {...props} />
                : <Redirect to="/main/post" />
            }
            />
        </Fragment>
    );
}

export default IntroPrivateRoute;