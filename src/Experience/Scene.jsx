import React, { Suspense, useRef } from 'react'
import DarkFirst from './models/dark/Dark_First'
import DarkSecond from './models/dark/Dark_Second'
import DarkThird from './models/dark/Dark_Third'
import DarkFourth from './models/dark/Dark_Fourth'
import DarkTargets from './models/dark/Dark_Targets'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import GridPlanes from './components/GridPlanes'

const Scene = ({ camera, pointerRef }) => {
  const groupRef = useRef()
  const groupRotationRef = useRef(0)

  useFrame(() => {

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
      <DarkFirst position={[0, 0, 0]} />
      <DarkSecond position={[0, 0, 0]} />
      <DarkThird position={[0, 0, 0]} />
      <DarkFourth position={[0, 0, 0]} />
      <DarkTargets />
      </group>

      <group>
        <GridPlanes planeDepth={5} planeWidth={5} rows={10} cols={10} spacing={0.01}/>
      </group>
    </Suspense>
  )
}

export default Scene
