import React, { useEffect } from 'react'
import Scene from './Scene'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'


const Experience = () => {

  const pointerRef = React.useRef({x:0, y:0});


  useEffect(() => {
    const onPointerMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  

  },[]);



  const cameraRef = React.useRef()
  return (
    <>
      <Canvas>
        <OrthographicCamera ref={cameraRef} makeDefault position={[
         -4.655719618827377,  4.89702741439811,6.157748878215362
        ]}
          rotation={[
 -0.6752273112197668,  -0.6754330729282368,  -0.4641972171080932,
          ]}
          zoom={120} />
      {/* <OrbitControls enableZoom={true} enablePan={true} enableRotate={false} /> */}
        <Scene pointerRef={pointerRef} camera={cameraRef} />
      </Canvas>  </>
  )
}

export default Experience