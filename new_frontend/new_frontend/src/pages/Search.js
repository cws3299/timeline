import React , {useEffect, useState} from 'react'
import NewNav from '../components/NewNav';
import './Search.css'
import {useLocation} from "react-router";
import SearchUserList from '../components/Search/User/SearchUserList';
import SearchPostList from '../components/Search/Post/SearchPostList';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function Search() {

    const classes = useStyles();
    const [age, setAge] = React.useState(0);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const location = useLocation();
    const searchword = location.state.search;
    const [what , setWhat] = useState("")

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
                        <SearchUserList />
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
                        {/* <PostContent /> */}
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
                        {/* <PostContent /> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;