import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRoomStore } from '../../stores/toggleRoomStore'
import gsap from 'gsap'


const Plane = ({ width, depth, position }) => {
    const planeref = useRef()
    const [hovered, setHovered] = useState(false)
    const isDarkRoom = useRoomStore((state) => state.isDarkRoom);

    useEffect(() => {
        if (!planeref.current) return;

        const material = planeref.current.material;
        const targetColor = !isDarkRoom ? "#000000" : "#ffffff";
        const targetColorHex = new THREE.Color(targetColor);

  
        gsap.to(material.color, {
            r: targetColorHex.r,
            g: targetColorHex.g,
            b: targetColorHex.b,
        });
        gsap.to(material.emissive, {
            r: targetColorHex.r,
            g: targetColorHex.g,
            b: targetColorHex.b,
        });


    }, [isDarkRoom])

    const material = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: "#ffffff",
                transparent: true,
                opacity: 0,
                emissive: new THREE.Color(0xffffff),
                emissiveIntensity: 0.8,
                side: THREE.DoubleSide,
            }),
        []
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

const GridPlanes = ({ planeWidth, planeDepth, rows, cols, spacing, ref }) => {
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

    return <group ref={ref}>{planes}</group>
}

export default GridPlanes
