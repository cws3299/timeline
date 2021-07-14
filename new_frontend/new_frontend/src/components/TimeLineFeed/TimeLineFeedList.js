import React , {useState , useRef, useCallback, useEffect} from "react";
import useFetch from "./TimeLineFeedListuseFetch";
import './TimeLineFeedList.css';
import TimeLineFeedListCard from "./TimeLineFeedListCard";


function TimeLineFeedList({tlidxx}) {

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

  console.log('list',list)
  return (
    <div className="TimeLineFeedList">
        
        {list.map((item, i) => (
          <TimeLineFeedListCard key={i} props={item}/>
        ))}
      <div ref={loader} />
    </div>
  );
}

export default TimeLineFeedList;