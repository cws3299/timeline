import React from "react";

const NoLogin2Input2 = ({ type = "text", iconLeft, placeholder, iconRight, value }) => {
  return (
    <div className="NoLogin2Input2">
      <input
        type={type}
        placeholder="Password"
        value={value}
        style={
          iconLeft && iconRight
            ? { padding: "0 40px" }
            : iconLeft
            ? { paddingLeft: "40px" }
            : iconRight && { paddingRight: "40px" }
        }
      />
      {/* {iconLeft && (
        <SVGIcon className="iconLeft" name={iconLeft} fill="rgb(55, 53, 214)" />
      )}
      {iconRight && (
        <SVGIcon
          className="iconRight"
          name={iconRight}
          fill="rgb(55, 53, 214)"
        />
      )} */}
    </div>
  );
};

export default NoLogin2Input2;