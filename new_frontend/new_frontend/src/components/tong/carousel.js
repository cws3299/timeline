// var React = require("react");
// var Coverflow = require("react-coverflow");
// var TimeLineCard = require('./TimeLineCard')
import React from 'react'
import Coverflow from 'react-coverflow'
import TimeLineCard from './TimeLineCard'
 

let fn = function (item) {
  console.log(item.tlcategory)
};

function Carousel ({timeline}) {
  return (
    <Coverflow
      width={960}
      height={480}
      displayQuantityOfSide={2}
      navigation={false}
      enableHeading={false}
    >
      {timeline.map((item, i) => (
          <TimeLineCard key={i} props={item} 
          style={{ display: "block", width: "100%" }}
          onClick={() => fn(item)}
          onKeyDown={() => fn(item)}
          role="menuitem"
          tabIndex="0"/>
        ))}
      {/* <div
        onClick={() => fn()}
        onKeyDown={() => fn()}
        role="menuitem"
        tabIndex="0"
      >
        <img
          src="http://andyyou.github.io/react-coverflow/images/album-1.png"
          alt="title or description"
          style={{ display: "block", width: "100%" }}
        />
      </div> */}
      {/* <img
        src="http://andyyou.github.io/react-coverflow/images/album-2.png"
        alt="title or description"
      
      />
      <img
        src="http://andyyou.github.io/react-coverflow/images/album-3.png"
        alt="title or description"
        
      />
      <img
        src="http://andyyou.github.io/react-coverflow/images/album-4.png"
        alt="title or description"
        
      />
      <img
        src="http://andyyou.github.io/react-coverflow/images/album-5.png"
        alt="title or description"
        
      />
      <img
        src="http://andyyou.github.io/react-coverflow/images/album-6.png"
        alt="title or description"
        
      /> */}
    </Coverflow>
  );
};

export default Carousel;
