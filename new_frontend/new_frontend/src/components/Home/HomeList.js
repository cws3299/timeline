import React , {useState , useRef, useCallback, useEffect} from "react";
import useFetch from "./useFetch";
import HomeListImage from"./HomeListImage"
import HomeListContent from"./HomeListContent"
import './HomeList.css';


function HomeList() {
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
    <div className="HomeList">
      {/* <input type="text" value={query} onChange={handleChange} /> */}
      <div className="HomeListImage1">
        {list.map((item, i) => (
          <HomeListImage key={i} props={item}/>
        ))}
      </div>
      <div className="HomeListContent1">
        {list.map((item, i) => (
          <HomeListContent key={i} props={item}/>
        ))}
      </div>
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error!</p>} */}
      <div ref={loader} />
    </div>
  );
}

export default HomeList;
