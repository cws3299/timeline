import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useScroll from "./useScroll";
import Item from "./Items";
import { fetchItem } from "./api";
import './style.css'

const VirtualScroller =  React.memo (function VirtualScroller() {
  const [scrollTop, ref] = useScroll();
  const [page, setPage] = useState(0);
  const [itemList, setItemList] = useState(() => JSON.parse(window.sessionStorage.getItem("itemList")) || []);

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(()=>{
    setDataSession(itemList)
  },[itemList])

  useEffect(() => {
    if (scrollTop + scrollViewPortHeight >= scrollContainerHeight) {
      setPage((page) => page + 1);
    }
  },);

  // useEffect(()=>{
  //   console.log('--')
  // },[scrollViewPortHeight ,itemHeight , totalItemCount , scrollContainerHeight , startIdx, offsetY ,visibleNodes ]);

  const getData = useCallback(async () => {
    const data = await fetchItem(page);
    setItemList(itemList.concat(data));
  }, [page,itemList]);

  const setDataSession = data =>(
    window.sessionStorage.setItem("itemList", JSON.stringify(data)))

  // scroll variables
  const NODE_PADDING = 5;

  const scrollViewPortHeight = 600;
  const itemHeight = 300;
  const totalItemCount = (page + 1);
  const scrollContainerHeight = Math.max(
    scrollViewPortHeight,
    itemHeight * totalItemCount
  );
  const startIdx = Math.floor(scrollTop / itemHeight);
  const offsetY = startIdx * itemHeight;
  const visibleNodes = itemList.slice(
    startIdx,
    startIdx + scrollViewPortHeight / itemHeight
  );

  console.log(scrollViewPortHeight,visibleNodes,page)

  return (
    <ScrollViewport ref={ref} height={scrollViewPortHeight} className="Scroll">
      <ScrollContainer height={scrollContainerHeight}>
        <VisibleNodesWrapper offsetY={offsetY}>
          {visibleNodes.map((item) => (
            <Item key={item.idx} index={item.url} height={itemHeight} />
          ))}
        </VisibleNodesWrapper>
      </ScrollContainer>
    </ScrollViewport>
  );
});

/* 
  Styled-components
*/

const ScrollViewport = styled.div`
  height: ${(props) => `${props.height}px`};
  width: 300px;
  border: 1px solid black;
  margin: 60px auto 0;
  overflow-y: auto;
`;

const ScrollContainer = styled.div`
  height: ${(props) => `${props.height}px`};
  position: relative;
`;

const VisibleNodesWrapper = styled.div`
  position: absolute;
  width: 100%;
  transform: ${(props) => `translateY(${props.offsetY}px)`};
`;

export default VirtualScroller;