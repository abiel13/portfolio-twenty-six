import React from 'react'
import Scene from './Scene'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const Experience = () => {
  return (
    <>
    <Canvas>
      <OrbitControls enableZoom={true} enablePan={true} />
        <Scene/>
    </Canvas>  </>
  )
}

export default Experience