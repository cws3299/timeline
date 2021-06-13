import React from "react";
import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";

// 로그인 없이 접근할 경우 인트로 화면으로 리다이렉트

function PrivateRoute({ component: Component, ...parentProps}){
    const statuss = localStorage.getItem("token");
    console.log('프라이빗빗빗',statuss)

    // 토큰이 없다는 이야기 == 비로그인
    const is_loginn = statuss === null ? false : true;
    return (
        <Fragment >
            <Route 
                {...parentProps}
                render = {(props) => 
                is_loginn ? <Component {...props} />
                : <Redirect to="/intro/" />
            }
            />
        </Fragment>
    );
}

export default PrivateRoute;