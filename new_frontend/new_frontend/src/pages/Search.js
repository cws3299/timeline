import React , {useEffect, useState} from 'react'
import NewNav from '../components/NewNav';
import './Search.css'
import {useLocation} from "react-router";
import SearchUserList from '../components/Search/User/SearchUserList';
import SearchPostList from '../components/Search/Post/SearchPostList';
import SearchTagList from '../components/Search/Tag/SearchTagList';
import SearchTimelineList from '../components/Search/Timeline/SearchTimelineList';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { history } from "../redux/configureStore"
import { useSelector, useDispatch } from "react-redux";
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function Search({match}) {
    const searchUser = useSelector(state => state.Search.searchfeed);
    let user = searchUser
    console.log('------------------------------------',match.params.searchword)

    const classes = useStyles();
    const [age, setAge] = React.useState(0);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const location = useLocation();
    const searchword = location.state.search;
    const searchword2 = location.state.search2;
    const [what , setWhat] = useState("")


    useEffect(() => {
        // history.go(0)
        // sendQuery(query);
        console.log('새로시작됨 000000',user)
        return () =>{
          console.log('삭제되었습니다~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        }
      }, [user]);

    if (age === 0){
        return(
            <div className="Search">
                <NewNav className = "SearchNewNav"/>
                <div className = "SearchBox">
                    <div className = "SearchBox2">
                    <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                        >
                        <MenuItem value={0}>user</MenuItem>
                        <MenuItem value={10}>timeline</MenuItem>
                        <MenuItem value={20}>post</MenuItem>
                        <MenuItem value={30}>tag</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                        <SearchUserList searchword2={searchword2} />
                    </div>
                </div>
            </div>
        )
    }else if (age === 20){
        return (
            <div className="Search">
                <NewNav className = "SearchNewNav"/>
                <div className = "SearchBox">
                    <div className = "SearchBox2">
                        <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}
                            >
                            <MenuItem value={0}>user</MenuItem>
                            <MenuItem value={10}>timeline</MenuItem>
                            <MenuItem value={20}>post</MenuItem>
                            <MenuItem value={30}>tag</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                        <SearchPostList/>
                    </div>
                </div>
            </div>
        )
    }else if (age === 10) {
        return (
            <div className="Search">
                <NewNav className = "SearchNewNav"/>
                <div className = "SearchBox">
                    <div className = "SearchBox2">
                    <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                        >
                        <MenuItem value={0}>user</MenuItem>
                        <MenuItem value={10}>timeline</MenuItem>
                        <MenuItem value={20}>post</MenuItem>
                        <MenuItem value={30}>tag</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                        <SearchTimelineList />
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className="Search">
                <NewNav className = "SearchNewNav"/>
                <div className = "SearchBox">
                    <div className = "SearchBox2">
                    <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                        >
                        <MenuItem value={0}>user</MenuItem>
                        <MenuItem value={10}>timeline</MenuItem>
                        <MenuItem value={20}>post</MenuItem>
                        <MenuItem value={30}>tag</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                        <SearchTagList />
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;