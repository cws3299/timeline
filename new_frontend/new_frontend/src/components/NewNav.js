import React ,{useState} from 'react'
import { history } from "../redux/configureStore"
// import {useLocation} from "react-router";
import './NewNav.css'
import { Input } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import { actionCreators as searchActions } from "../redux/modules/search";
import { useSelector, useDispatch } from "react-redux";


function NewNav(){
    const dispatch = useDispatch();
    // const location = useLocation();

    const feedidx = (word) =>{
        console.log(331111111111111111111111,word)
        dispatch(searchActions.setsearchFeedSV(word));
      }

    const [searchWord , setSearchWord] = useState("")

    const onChangeSearch = (e) =>{
        setSearchWord(e.target.value)
        console.log(searchWord)
    }

    const onSearch = async(event) => {
        if(event.key === 'Enter'){
          console.log('enter press here! ',searchWord)
          await feedidx(searchWord)
        //   location.reload()
          console.log('rrrrr',searchWord)
          history.push({
              pathname:`/main/search/${searchWord}`,
              state:{search:searchWord}
          })
        //   window.location.reload()
        }
      }

    const goHome = () =>{
        history.push({
            pathname:"/main/home2"
        })
    }

    const goTimeline = () =>{
        history.push({
            pathname:"/main/timeline"
        })
    }
    const goTimecapsule = () =>{
        history.push({
            pathname:"/main/timecapsule"
        })
    }
    const goPostbox = () =>{
        history.push({
            pathname:"/main/postbox"
        })
    }
    const goMypage = () =>{
        history.push({
            pathname:"/main/mypage"
        })
    }

    return(
        <div className = "NewNav" >
            <div className = "NewNav2"> 
                <div className ="NewNavHomeBox">
                    <div className ="NewNavHome" onClick={goHome}>TimeLine</div>
                </div>
                <div className ="NewNavSearchBox">
                    <Input onChange={onChangeSearch} onKeyPress={onSearch}/>
                </div>
                <div className ="NewNavButtonBox">
                    <i class="far fa-calendar-alt" onClick={goTimeline} style={{paddingLeft:'10px', paddingRight:'10px'}}></i>
                    <i class="far fa-envelope" onClick={goPostbox} style={{paddingLeft:'10px', paddingRight:'10px'}}></i>
                    <i class="fas fa-history" onClick={goTimecapsule} style={{paddingLeft:'10px', paddingRight:'10px'}}></i>
                    <i class="fas fa-user" onClick={goMypage} style={{paddingLeft:'10px', paddingRight:'10px'}}></i>
                </div>
            </div>
        </div>
    )
}

export default NewNav;