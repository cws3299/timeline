import React , {useEffect ,useState} from 'react';
import { useSpring, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './TimeLineListImage.css'
import {imageConfig} from '../../shared/imageConfig'


const processXY = (x, y, target) => {
    const bounds = target.getBoundingClientRect()
  
    return { x: (x - bounds.left) / bounds.width, y: (y - bounds.top) / bounds.height }
  }
  
  const composeTransform = (x, y, s = 1) => {
    return `perspective(600px) rotateY(${y}deg) rotateX(${-x}deg) scale(${s})`
  }
  
function TimeLineListImage({props}) {
  const maxAngle = 10; 
  const zoom = false;

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
  const [img, setImg] = useState("https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png")
  const image_url = imageConfig.src
  useEffect(async()=>{
    // console.log('props',props.mphoto)
    if (props.mphoto === null || props.mphoto === undefined){
      console.log()
      // console.log('==',image_url)
    }else{
      console.log(image_url)
      console.log('===',props.mphoto)
      // await setImg(`${image_url}/${props.mphoto}`)
      await setImg('https://cdn.crowdpic.net/detail-thumb/thumb_d_4CF137F200A8D56B729959D8D9E8FC3A.jpg')
      console.log('pppppppp',img)
    }
  })

  return (
    <animated.div
      className="TimeLineListImage"
      {...bind()}
      style={{
        backgroundImage: `url(${img})`,
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
export default TimeLineListImage;