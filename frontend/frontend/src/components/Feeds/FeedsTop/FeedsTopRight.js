import React from 'react';
import './FeedsTopRight.css';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core';

function FeedsTopRight() {
    return (
        <div className="FeedsTopRightBox">
            <div className = "FeedsTopRightGrid">
                <NotificationsActiveIcon className ='FeedsTopRightGridIcon' fontSize = 'large' />
                <div className ='FeedsTopRightGridName'><p stylel="font-family: 'Black Han Sans', sans-serif;">슬기</p></div>
                <Avatar variant="rounded" alt="Remy Sharp" src="data:image/jpeg;base64,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" />
                <Button variant="outlined" color="#f0f0f0" className="FeedsTopRightBoxButton" size="large">
                    마이페이지
                </Button>
            </div>
        </div>
    )
};

export default FeedsTopRight;