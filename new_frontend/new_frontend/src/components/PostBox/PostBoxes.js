import React from 'react'
import { render } from 'react-dom'
import { animated, interpolate, useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import move from 'lodash-move'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { CardWrap, Wrap } from './PostboxesStyle'

const cards = ['#266678', '#cb7c7a', ' #36a18b', '#cda35f', '#747474']
const config = { tension: 400, friction: 20 }
const CARD_RATIO = '63.1%'
const CARD_COUNT = cards.length
const CARD_OFFSET = -10

const setScale = count => 1 - count / 20

const setter = (order, curIndex, y, down) => index => {
  index = order.indexOf(index)
  const isBelow = y < -100 // CARD_COUNT * CARD_OFFSET

  return down && index === curIndex
    ? {
        scale: isBelow ? setScale(CARD_COUNT) : 1,
        y,
        zIndex: isBelow ? 1 : CARD_COUNT + 1,
        config,
        immediate: key => key === 'y' || key === 'zIndex'
      }
    : {
        scale: setScale(index),
        y: index * CARD_OFFSET,
        // Add 1 here so we don’t need to use 0 above.
        zIndex: CARD_COUNT - index + 1,
        immediate: key => key === 'zIndex'
      }
}

export default function PostBoxes() {
  const ref = React.useRef(null)
  const cardOrder = React.useRef(cards.map((_, index) => index))

  const [springs, setSprings] = useSprings(
    CARD_COUNT,
    setter(cardOrder.current)
  )

  // Set the drag hook and define component movement based on gesture data.
  const bind = useDrag(event => {
    const {
      args: [origlIndex],
      down,
      movement: [, y]
    } = event
    const curIndex = cardOrder.current.indexOf(origlIndex)
    const newOrder = move(cardOrder.current, 0, CARD_COUNT)
    disableBodyScroll(ref.current, { reserveScrollBarGap: true })

    if (!down) {
      cardOrder.current = newOrder
      enableBodyScroll(ref.current)
    }

    setSprings(setter(cardOrder.current, curIndex, y, down))
  })

  return (
    <Wrap>
      <CardWrap ref={ref}>
        {springs.map(({ scale, y, zIndex }, index) => {
          const color = cards[index]

          return (
            <animated.div
              {...bind(index)}
              style={{
                backgroundColor: color,
                borderRadius: '3% / 5%',
                cursor: 'grab',
                left: 0,
                paddingTop: CARD_RATIO,
                position: 'absolute',
                right: 0,
                transform: interpolate(
                  [y, scale],
                  (y, scale) => `translateY(${y}px) scale(${scale})`
                ),
                transformOrigin: 'top center',
                zIndex
              }}
              key={index}
            >
            </animated.div>
          )
        })}
      </CardWrap>
    </Wrap>
  )
}

