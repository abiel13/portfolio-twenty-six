

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useGLTFWithKTX2 } from '../../utils/useGtlfWithkxt2';
import { convertMaterialsToBasic } from '../../utils/convertToBasic';

export default function Model(props) {
  const { nodes, materials } = useGLTFWithKTX2('/models/Dark Room/Dark_Second.glb')

  const newMaterials = convertMaterialsToBasic(materials, 0.1);
  

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Second_Baked.geometry} material={newMaterials.Second_Real_Texture_Set_Baked} position={[0.053, 0, 0.341]} rotation={[Math.PI, 0, Math.PI]} />
    </group>
  )
}

