import React, { useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import TimeLineBooks from "./TimeLineBooks";

export default function TimeLineCarousel({data}) {
  const [slideSetting, setSlideSetting] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  });

  console.log('rrrr',data)

  const slides = data.map((slide,i)=>({
            key:i,
            content:<TimeLineBooks data2={slide}/>
  }))
  
  slides.map((slide, index) => {
      console.log('00',slide)
    return { ...slide, onClick: () => setSlideSetting({ goToSlide: index }) };
  });

  const onChangeInput = (e) => {
    setSlideSetting({
      [e.target.name]: parseInt(e.target.value, 10) || 0
    });
  };

  return (
    <div style={{ width: "80%", height: "500px", margin: "0 auto" }}>
      <Carousel
        slides={slides}
        goToSlide={slideSetting.goToSlide}
        offsetRadius={slideSetting.offsetRadius}
        showNavigation={slideSetting.showNavigation}
        animationConfig={slideSetting.config}
      />
      <div
        style={{
          margin: "0 auto",
          marginTop: "2rem",
          width: "50%",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
      </div>
    </div>
  );
}
