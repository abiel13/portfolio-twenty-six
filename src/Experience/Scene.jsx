import React, { Suspense, useRef } from 'react'
import DarkFirst from './models/dark/Dark_First'
import DarkSecond from './models/dark/Dark_Second'
import DarkThird from './models/dark/Dark_Third'
import DarkFourth from './models/dark/Dark_Fourth'
import DarkTargets from './models/dark/Dark_Targets'
import LightFirst from './models/light/Light_First'
import LightSecond from './models/light/Light_Second'
import LightThird from './models/light/Light_Third'
import LightFourth from './models/light/Light_Fourth'
import LightTarget from './models/light/Light_Targets'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import GridPlanes from './components/GridPlanes'



const Scene = ({ camera, pointerRef }) => {
  const groupRef = useRef()
  const groupRotationRef = useRef(0)

  useFrame(() => {
    // console.log(camera.current.position)
    // console.log(camera.current.rotation)
    // console.log(camera.current.zoom)


    if (!groupRef.current) return
    const targetRotation = pointerRef.current.x * Math.PI * 0.2


    groupRotationRef.current = THREE.MathUtils.lerp(
      groupRotationRef.current,
      targetRotation,
      0.05
    )

    groupRef.current.rotation.y = groupRotationRef.current
  })

  return (
    <Suspense>
      <group ref={groupRef}>
        <DarkFirst />
        <DarkSecond />
        <DarkThird />
        <DarkFourth />
        <DarkTargets />
      </group>

      <group>
        <GridPlanes planeDepth={2} planeWidth={2} rows={20} cols={20} spacing={0.01} />
      </group>

      <group >
        <LightFirst />
        <LightSecond />
        <LightThird />
        <LightFourth />
        <LightTarget />
      </group>
    </Suspense>
  )
}

export default Scene
