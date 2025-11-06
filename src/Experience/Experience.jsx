import React, { useEffect } from 'react'
import Scene from './Scene'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { useRoomStore } from '../stores/toggleRoomStore'


const Experience = () => {

  const pointerRef = React.useRef({ x: 0, y: 0 });
  const isDarkRoom = useRoomStore((state) => state.isDarkRoom);
  const cameraRef = React.useRef();
  const setTransitioning = useRoomStore(state => state.setTransitioning)



  const camerapositions = {
    dark: {
      position: new THREE.Vector3(-5.343347927650611,
        5.814755800622669,
        6.742415043273456),
      rotation: new THREE.Vector3(
        -0.7116572572716386,
        -0.5405246972464048,
        -0.41767464462470266
      ),
      zoom: 128
    }
    ,
    light: {
      position: new THREE.Vector3(14.794812934171853, 13.348956552455771, 16.2042565605176).multiplyScalar(1.5),
      rotation: new THREE.Vector3(-0.6789880022961486,
        -0.597662349188293,
        -0.4262599453447497),
      zoom: 183.29251597471116
    }

  }



  const disableTransition = () => {
    setTransitioning(false);
  }

  useEffect(() => {
    if (!cameraRef.current) return;





    const gtl = gsap.timeline();

    gtl.to(cameraRef.current, {
      zoom: 110,
      onUpdate: () => cameraRef.current.updateProjectionMatrix(),
      duration: .3,
      ease: 'power1'
    },

    )
      .to(cameraRef.current.position, {
        x: isDarkRoom ? camerapositions.dark.position.x : camerapositions.light.position.x,
        y: isDarkRoom ? camerapositions.dark.position.y : camerapositions.light.position.y,
        z: isDarkRoom ? camerapositions.dark.position.z : camerapositions.light.position.z,
        ease: 'power1',
        duration: .5
      },
      ).to(cameraRef.current, {
        zoom: 128,
        onUpdate: () => cameraRef.current.updateProjectionMatrix(),
        duration: .3,
        ease: 'power1'
      })


    disableTransition();


  }, [isDarkRoom])


  useEffect(() => {
    const onPointerMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };


  }, []);




  return (
    <>
      <Canvas>
        <OrthographicCamera ref={cameraRef} makeDefault position={[
          -5.343347927650611,
          5.814755800622669,
          6.742415043273456
        ]}
          rotation={[

            -0.7116572572716386,
            -0.5405246972464048,
            -0.41767464462470266
          ]}
          zoom={128} />

        {/* <OrbitControls /> */}
        <Scene pointerRef={pointerRef} camera={cameraRef} />
      </Canvas>  </>
  )
}

export default Experience