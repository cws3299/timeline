import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { config } from '../../../shared/config'
import { useSelector, useDispatch } from "react-redux";

function SearchUserUsefetch(query, page) {
  const searchUser = useSelector(state => state.Search.searchfeed);
  console.log('--------------12',searchUser)
  const user1 = searchUser
  let user = searchUser
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const url = config.api
  const _token = localStorage.getItem("token");
  let token = {
    headers: { Authorization: `Bearer ${_token}` },
  };

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      console.log('+++++',user)
      const res = await axios.get(`${url}/search/user?user=${user}&page=${page}`,token)
      await console.log('restt',res,searchUser)
      await setList((prev) => [...prev, ...res.data]);
    //   console.log('u',list)
      console.log('listtt',list)
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query, page, user]);

  useEffect(() => {
    // window.location.reload()
    console.log('새로 시작됨1',query,user,1111,searchUser,333)
    sendQuery(query);
    return () =>{
      console.log('삭제됨2222222222222222222222222222222222')
      if(user1 !== user){
        setList([]);
      }
      // sendQuery(user)
    }
  }, [query, sendQuery, page , user]);

  return { loading, error, list };
}

export default SearchUserUsefetch;