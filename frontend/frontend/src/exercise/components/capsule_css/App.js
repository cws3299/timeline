import React from "react";

import "./App.css";

const App = () => {
  const newArr = Array.from({ length: 16 }, (el, index) => index + 1);

  return (
    <div className="container">
      <div className="box">
        {newArr.map((num) => (
          <span key={num} style={{ "--i": num }}>
            <i>My</i> - <i>Time</i>Capsule
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;