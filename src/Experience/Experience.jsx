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
        <OrthographicCamera ref={cameraRef} makeDefault rotation={[
          -0.5006427955800709
          ,
          -0.9084753454172618
          ,
          -0.40732498401852546]}
          position={[

            -6.481619690173266,
            3.657348937829595,
            4.470140881533256
          ]}
          zoom={100} />
    
        <Scene pointerRef={pointerRef} camera={cameraRef} />
      </Canvas>  </>
  )
}

export default Experience