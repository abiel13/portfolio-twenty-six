import React, { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const Plane = ({ width, depth, position }) => {
    const planeref = useRef()
    const [hovered, setHovered] = useState(false)

    const color = useMemo(() => {
        const colorHexArray = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff]
        return colorHexArray[Math.floor(Math.random() * colorHexArray.length)]
    }, [])

    const material = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color,
                transparent: true,
                opacity: 0,
                emissive: new THREE.Color(0xffffff),
                emissiveIntensity: 0.8,
                side: THREE.DoubleSide,
            }),
        [color]
    )

    useFrame((_, delta) => {
        const target = hovered ? 1 : 0
        const speed = hovered ? 2 : 4
        material.opacity = THREE.MathUtils.lerp(material.opacity, target, speed * delta)
    })

    return (
        <mesh
            ref={planeref}
            position={position}
            rotation={[-Math.PI / 2, 0, 0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            material={material}
        >
            <planeGeometry args={[width, depth]} />
        </mesh>
    )
}

const GridPlanes = ({ planeWidth, planeDepth, rows, cols, spacing }) => {
    const gridWidth = cols * (planeWidth + spacing) - spacing
    const gridDepth = rows * (planeDepth + spacing) - spacing
    const startX = planeWidth / 2 - gridWidth / 2
    const startZ = planeDepth / 2 - gridDepth / 2

    const planes = useMemo(() => {
        const arr = []
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = startX + j * (planeWidth + spacing)
                const z = startZ + i * (planeDepth + spacing)
                arr.push(
                    <Plane key={`${i}-${j}`} width={planeWidth} depth={planeDepth} position={[x, -0.125, z]} />
                )
            }
        }
        return arr
    }, [rows, cols, planeWidth, planeDepth, spacing, startX, startZ])

    return <group>{planes}</group>
}

export default GridPlanes
