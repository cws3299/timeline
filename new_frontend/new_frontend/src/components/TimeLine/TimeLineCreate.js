import React from 'react'
import './TimeLineCreate.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TimeLineCreateButton from './TimeLineCreateButton';


function TimeLineCreate(){
    return (
        <div className="TimeLineCreate">
            < TimeLineCreateButton />
        
        </div>
    )
}

export default TimeLineCreate;