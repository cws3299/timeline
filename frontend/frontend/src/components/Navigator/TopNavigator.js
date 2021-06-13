import React from "react";
import { history } from "../../redux/configureStore";
import { actionCreators as userActions } from "../../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import './TopNavigator.css'

function TopNavigator(props) {

    return (
        <div className = "TopNavigator">
            <div ClassName="TopNavigatorBox">

            </div>
        </div>
    );
}




export default TopNavigator;