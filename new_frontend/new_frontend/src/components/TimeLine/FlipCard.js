import React from 'react';
import Styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import frontBackgroundImage from '../../assets/fair.jpg';

const StyleForFrontAndBack = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5rem 3rem;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  display: grid;
  align-content: center;
`;

const Card = Styled.div`
 width: 400px;
`;

const Content = Styled.div`
  text-align: center;
  position: relative;
  padding: 15rem 5rem;
  transition: transform ${(props) => `${props.speed}s`};
  transform-style: preserve-3d;
  
  &:hover {
    transform: rotateY(.5turn);
  }
`;
const Front = Styled.div`
  background-color: #b7c9e5;
  background-image: url(${(props) => props.frontBackgroundImage});
  background-size: cover;
  background-blend-mode: overlay;
  color: #333;
  ${StyleForFrontAndBack}

  &::before {
    content: '';
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    border: 3px solid;
    transform: translateZ(3rem);
  }

  h3 {
    font-size: 3.5rem;
    transform: translateZ(9rem);
    text-transform: uppercase;
  }

  p {
    transform: translateZ(6rem);
    text-transform: uppercase;
    letter-spacing: 4px;
    font-size: .75rem;
    font-weight: 700;
    opacity: .7;
  }
`;

const Back = Styled.div`
  ${StyleForFrontAndBack}
  transform: rotateY(.5turn);
  color: #b7c9e5;
  background: #333;

  p {
    transform: translateZ(6rem);
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.6;
  }
`;

const FlipCard = ({
  frontTitle,
  frontSubtitle,
  frontBackgroundImage,
  backContent,
  backBackgroundImage,
  speed,
}) => {
  return (
    <Card>
      <Content speed={speed}>
        <Front frontBackgroundImage={frontBackgroundImage}>
          <p>{frontTitle}</p>
          <h3>{frontSubtitle}</h3>
        </Front>
        <Back backBackgroundImage={backBackgroundImage}>
          <p>{backContent}</p>
        </Back>
      </Content>
    </Card>
  );
};

FlipCard.propTypes = {
  frontTitle: PropTypes.string.isRequired,
  frontSubtitle: PropTypes.string.isRequired,
  frontBackgroundImage: frontBackgroundImage,
  backContent: PropTypes.string.isRequired,
  speed: PropTypes.number,
};

FlipCard.defaultProps = {
  frontTitle: 'Time for some fun',
  frontSubtitle: 'The Fair',
  frontBackgroundImage: frontBackgroundImage,
  backContent:
    'This would be some longer text that gives a description of the things from the other side I guess',
  speed: 3,
};

export default FlipCard;