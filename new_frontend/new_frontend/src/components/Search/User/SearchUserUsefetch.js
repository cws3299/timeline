import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { config } from '../../../shared/config'
import { useSelector, useDispatch } from "react-redux";

function SearchUserUsefetch(query, page) {
  const searchUser = useSelector(state => state.Search.searchfeed);
  console.log('--------------12',searchUser)
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
      const res = await axios.get(`${url}/search/user?user=${searchUser}&page=${page}`,token)
      console.log('restt',res.data)
      await setList((prev) => [...prev, ...res.data]);
    //   console.log('u',list)
      console.log('listtt',list)
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);

  return { loading, error, list };
}

export default SearchUserUsefetch;