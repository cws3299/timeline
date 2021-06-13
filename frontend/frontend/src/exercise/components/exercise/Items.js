import React from "react";
import styled from "styled-components";

const Item = ({ index, height }) => (
  <ItemWrapper height={height}>Item {index}</ItemWrapper>
);

const ItemWrapper = styled.div`
  height: ${(props) => `${props.height}px`};
  background-color: "#fafafa";
  font-weight: bold;
`;

export default Item;