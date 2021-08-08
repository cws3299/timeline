import React , {useState , useRef, useCallback, useEffect} from "react";
import useFetch from "./SearchUserUsefetch";
import './SearchUserList.css';
import SearchUserCard from "./SearchUserCard";


function SearchUserList(props) {
  console.log('여기까지')
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
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className="SearchUserList">
        
        {list.map((item, i) => (
          <SearchUserCard key={i} props={item}/>
        ))}
      <div ref={loader} />
    </div>
  );
}

export default SearchUserList;