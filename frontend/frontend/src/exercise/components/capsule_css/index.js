import Box from './Box'
import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'

function Boxx () {
  return(

    ReactDOM.render(
        <Canvas>
          <ambientLight />
          <pointLight position={[-10, 10, 10]} />
          <Box position={[0, 0, 0]} />
        </Canvas>,
        document.getElementById('root')
      )
      )
  }


export default Boxx;