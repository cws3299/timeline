import React , {useState , useRef, useCallback, useEffect} from "react";
import useFetch from "./SearchTagUseFetch";
import './SearchTagList.css';
import SearchTagCard from "./SearchTagCard";
import { useSelector, useDispatch } from "react-redux";

function SearchTagList(props) {
  console.log('props',props)
  const searchUser = useSelector(state => state.Search.searchfeed);
  // console.log('여기까지',query)
  let user = searchUser
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list } = useFetch(query, page);
  const loader = useRef(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    // await setQuery(user)
    // console.log('새로 시작됨2',user)
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    console.log('kojojojoj',page)
    return () =>{
      console.log('여기만 되면돼')
      setPage(1)
    }
  }, [handleObserver,user]);

  return (
    <div className="SearchTagList">
        
        {list.map((item, i) => (
          <SearchTagCard key={i} props={item}/>
        ))}
      <div ref={loader} />
    </div>
  );
}

export default SearchTagList;