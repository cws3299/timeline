import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { config } from '../../../shared/config'
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as searchActions2 } from "../../../redux/modules/search2";


function SearchPostUsefetch(query, page) {
  const searchUser = useSelector(state => state.Search.searchfeed);
  let searchUser2 = useSelector(state => state.Search2.searchfeed2);

  const dispatch = useDispatch();

  const feedidx2 = (word) =>{
      console.log(22331111111111111111111111,word)
      dispatch(searchActions2.setsearchFeedSV2(word));
    }


  // console.log('--------------12',searchUser,searchUser2)
  let user1 = searchUser
  let user = searchUser
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  // const [pp , setPP] = useState(1)
  const url = config.api
  const _token = localStorage.getItem("token");
  let token = {
    headers: { Authorization: `Bearer ${_token}` },
  };

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      // console.log('+++++',user)
      let aa = 0
      const res = await axios.get(`${url}/search/user?user=${user}&page=${page}`,token)
      // console.log('resssssssssssssssssss',res)
      await setList((prev) => [...prev, ...res.data]);
      if (res.data.length === 0){
        return { query ,aa, user }
      }else{
        return {
          query,page,user
        }
      }

      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query, page, user]);

  useEffect(async() => {
    let a = await sendQuery(query);
    // let a1 = a.page
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',a1)
    return () =>{
      setList([]);
      // if(page !== a1){
      //   setList([]);
      //   feedidx2(searchUser)
      // }
      
    }
  }, [query, sendQuery, page , user]);

  return { loading, error, list };
}


export default SearchPostUsefetch;