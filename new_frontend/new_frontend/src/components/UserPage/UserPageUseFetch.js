import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { config } from '../../shared/config'


function UserPageUseFetch(query, page , mmidx) {
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
      console.log('11111',mmidx.midx)
      const res = await axios.post(`${url}/timeline/list?midx=${mmidx.midx}&page=${page}`,null,token)
      await setList((prev) => [...prev, ...res.data]);
    //   console.log('u',list)
      console.log('1111111111',res)
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

export default UserPageUseFetch;