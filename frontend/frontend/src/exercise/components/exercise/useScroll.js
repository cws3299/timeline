  
import { useEffect, useRef, useState, SyntheticEvent } from "react";

const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef();

  const onScroll = (e) => {
    requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop);
    });
  };

  useEffect(() => {
    const scrollContainer = ref.current;
    setScrollTop(scrollContainer.scrollTop);
    scrollContainer.addEventListener("scroll", onScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", onScroll);
    };
  }, []);

  return [scrollTop, ref];
};

export default useScroll;