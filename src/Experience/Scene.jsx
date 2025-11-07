import React, { Suspense, useEffect, useRef } from 'react'
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
import { useRoomStore } from '../stores/toggleRoomStore'
import gsap from 'gsap';




const Scene = ({ camera, pointerRef }) => {
  const darkGroupRef = useRef();
  const lightGroupRef = useRef();
  const gridPlaneRef = useRef();
  const groupRotationRef = useRef(0)
  const lightRoomPos = new THREE.Vector3(24.79, -0.201, 0.173)
  const darkRoomGroupPos = new THREE.Vector3(0, 0, 0)
  const lightRoomGroupPos = new THREE.Vector3(24.79, 0, 0.173)

  const {isDarkRoom, isTransitioning} = useRoomStore() 


  useEffect(() => {
    if(!gridPlaneRef.current ) return;

    const targetPosition = isDarkRoom ? darkRoomGroupPos : lightRoomGroupPos;

    gsap.to(gridPlaneRef.current.position , {
      x:targetPosition.x,
      y:targetPosition.y
    });

  },[isDarkRoom])
  

  useFrame(() => {
    // console.log(camera.current.position)
    // console.log(camera.current.rotation)
    // console.log(camera.current.zoom)


    if (!darkGroupRef.current || !lightGroupRef.current || !gridPlaneRef.current) return
    const targetRotation = pointerRef.current.x * Math.PI * 0.12


    groupRotationRef.current = THREE.MathUtils.lerp(
      groupRotationRef.current,
      targetRotation,
      0.05
    )

    darkGroupRef.current.rotation.y = groupRotationRef.current
    lightGroupRef.current.rotation.y = groupRotationRef.current
    gridPlaneRef.current.rotation.y = groupRotationRef.current


  })

  return (
    <Suspense>
      <group ref={darkGroupRef}>
        <DarkFirst />
        <DarkSecond />
        <DarkThird />
        <DarkFourth />
        <DarkTargets />
      </group>
      <group ref={lightGroupRef} position={lightRoomPos}>
        <LightFirst position={[-lightRoomPos.x, -lightRoomPos.y, -lightRoomPos.z]} />
        <LightSecond position={[-lightRoomPos.x, -lightRoomPos.y, -lightRoomPos.z]} />
        <LightThird position={[-lightRoomPos.x, -lightRoomPos.y, -lightRoomPos.z]} />
        <LightFourth position={[-lightRoomPos.x, -lightRoomPos.y, -lightRoomPos.z]} />
        <LightTarget position={[-lightRoomPos.x, -lightRoomPos.y, -lightRoomPos.z]} />
      </group>
      <group>
        <GridPlanes ref={gridPlaneRef} planeDepth={2} planeWidth={2} rows={10} cols={10} spacing={0.01} />
      </group>
    </Suspense>
  )
}

export default Scene
