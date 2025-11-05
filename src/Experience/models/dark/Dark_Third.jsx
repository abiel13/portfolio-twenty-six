

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { convertMaterialsToBasic } from '../../utils/convertToBasic';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models/Dark Room/Dark_Third.glb')

  const newMaterials = convertMaterialsToBasic(materials, 0.1);
  

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Floor_Vaccum_Third_Baked.geometry} material={newMaterials.Third_Real_Real_Texture_Set_Baked} position={[1.371, 0, -0.354]} rotation={[Math.PI, 0, Math.PI]} scale={1.015} />
      <mesh geometry={nodes.Third_Baked.geometry} material={newMaterials.Third_Real_Real_Texture_Set_Baked} position={[-0.819, 0.746, 1.115]} rotation={[Math.PI / 2, 0, 0.47]} />
      <mesh geometry={nodes.Fan_Third_Baked.geometry} material={newMaterials.Third_Real_Real_Texture_Set_Baked} position={[0.247, 0.951, 0.524]} rotation={[Math.PI / 2, 0, 0.47]} />
    </group>
  )
}

