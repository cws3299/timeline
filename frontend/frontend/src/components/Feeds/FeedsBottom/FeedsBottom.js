import React from 'react'
import './FeedsBottom.css'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import RestoreIcon from '@material-ui/icons/Restore';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FeedsBottomFeeds from './FeedsBottomFeeds';


const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiButton: {
        // Name of the rule
        text: {
          // Some CSS
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
      },
    },
  });


function FeedsBottom() {
    return (
        <div className="FeedsBottomBox">
            <div className = "FeedsBottom">
                <div className = "FeedsBottom1_nav">
                    <div className = "FeedsBottom1_">
                        <div className = "FeedsBottom1_plus">
                            <AddCircleOutlineIcon fontSize='inherit' color='inherit'/>
                        </div>
                        {/* <div className = "FeedsBottom1_timeline">
                            <CalendarTodayIcon fontSize='inherit' color='inherit'/>
                        </div> */}
                        <div className = "FeedsBottom1_feeds">
                            <MarkunreadMailboxIcon fontSize='inherit' color='inherit'/>
                        </div>
                        <div className = "FeedsBottom1_postbox">
                            <FeaturedPlayListIcon fontSize='inherit' color='inherit' />
                        </div>
                        <div className = "FeedsBottom1_timecapsule">
                            <RestoreIcon fontSize='inherit' color='inherit'/>
                        </div>
                    </div>
                </div>
                <div className = "FeedsBottom2_timelines"></div>
                <FeedsBottomFeeds />
            </div>
        </div>
    )
};

export default FeedsBottom;