import React, { Suspense, useRef } from 'react'
import RoomModel from '../Experience/models/Office-portfolio1-v1.jsx'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Scene = ({ camera, pointerRef }) => {
  const groupRef = useRef()
  const groupRotationRef = useRef(0)

  useFrame(() => {
    if (!groupRef.current) return

    const targetRotation = pointerRef.current.x * Math.PI * 0.025

    // ✅ Don't redeclare — just update the existing ref value
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
        <RoomModel />
      </group>
    </Suspense>
  )
}

export default Scene
