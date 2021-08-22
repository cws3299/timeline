import React from 'react';
import { useSpring, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './PostBoxChoiceLeft.css'
import { actionCreators as homeActions } from "../../redux/modules/home";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../redux/configureStore"

const processXY = (x, y, target) => {
    const bounds = target.getBoundingClientRect()
  
    return { x: (x - bounds.left) / bounds.width, y: (y - bounds.top) / bounds.height }
  }
  
  const composeTransform = (x, y, s = 1) => {
    return `perspective(600px) rotateY(${y}deg) rotateX(${-x}deg) scale(${s})`
  }
  
function PostBoxChoiceLeft({props}) {
  const dispatch = useDispatch();
  const maxAngle = 10; 
  const zoom = false;

  const goReceive = () => {
    history.push({
        pathname: "/main/ReceiveLetter",
      })
  } 

  // console.log('iii',props)

  const items = props
  const [spring, set] = useSpring(
    () => ({
      // 0, 0.5 и 1 is a percentage value
      // of a cursor position on element axis
      // percentage is used because they're element
      // width/height abstract
      x: 0.5,
      y: 0.5,
      s: 1,
    }),
    { config: { mass: 5, tension: 350, friction: 40 } },
  )

  const bind = useGesture(
    {
      onMove: (result) => {
        const { values, event } = result

        const [x, y] = values

        console.log(x, y)

        const coords = processXY(x, y, event.target)

        set(coords)
      },
      onHover: ({ hovering }) => {
        if (!hovering) {
          set({ x: 0.5, y: 0.5, s: 1 })
          return
        }

        if (zoom) {
          set({ s: 1.1 })
        }
      },
    },
    { eventOptions: { passive: false } },
  )


  return (
    <animated.div
      className="PostBoxChoiceLeft"
      onClick={goReceive}
      {...bind()}
      style={{
        // backgroundImage: `url("../../Image/1.png")`,
        backgroundSize:'100% 100%',
        transform: interpolate(
          [
            spring.y.interpolate([0, 0.5, 1], [-maxAngle, 0, maxAngle]),
            spring.x.interpolate([0, 0.5, 1], [-maxAngle, 0, maxAngle]),
            spring.s.interpolate((s) => s),
          ],
          composeTransform,
        ),
      }}
    />
  )
}

export default PostBoxChoiceLeft;
