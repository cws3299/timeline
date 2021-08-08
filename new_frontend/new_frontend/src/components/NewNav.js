import React ,{useState} from 'react'
import { history } from "../redux/configureStore"
import './NewNav.css'
import { Input } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import { actionCreators as searchActions } from "../redux/modules/search";
import { useSelector, useDispatch } from "react-redux";


function NewNav(){
    const dispatch = useDispatch();

    const feedidx = (word) =>{
        console.log(1111111111111111111111,word)
        dispatch(searchActions.setsearchFeedSV(word));
      }

    const [searchWord , setSearchWord] = useState("")

    const onChangeSearch = (e) =>{
        setSearchWord(e.target.value)
        console.log(searchWord)
    }

    const onSearch = (event) => {
        if(event.key === 'Enter'){
          console.log('enter press here! ',searchWord)
          feedidx(searchWord)
          history.push({
              pathname:"/main/search",
              state:{search:searchWord}
          })
        }
      }

    return(
        <div className = "NewNav" >
            <div className = "NewNav2"> 
                <div className ="NewNavHomeBox">
                    <div className ="NewNavHome">TimeLine</div>
                </div>
                <div className ="NewNavSearchBox">
                    <Input onChange={onChangeSearch} onKeyPress={onSearch}/>
                </div>
                <div className ="NewNavButtonBox">
                    <i class="far fa-envelope" style={{paddingLeft:'10px', paddingRight:'10px'}}></i>
                    <i class="fas fa-history" style={{paddingLeft:'10px', paddingRight:'10px'}}></i>
                    <i class="fas fa-user" style={{paddingLeft:'10px', paddingRight:'10px'}}></i>
                </div>
            </div>
        </div>
    )
}

export default NewNav;