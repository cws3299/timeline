import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { config } from '../../shared/config'
import { useSelector, useDispatch } from "react-redux";

function TimeLineFeedListuseFetch({query, page}) {
  const tlidxx = useSelector(state => state.timelinefeed.homefeed);
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
      const res = await axios.post(`${url}/post/list/${tlidxx}`,null,token)
      await setList((prev) => [...prev, ...res.data]);
    //   console.log('u',list)
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

export default TimeLineFeedListuseFetch;