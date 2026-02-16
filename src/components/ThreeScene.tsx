'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Points, PointMaterial, Environment, Float, Stars, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

function Coin(props: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <Float floatIntensity={2} rotationIntensity={1}>
            <group {...props}>
                {/* Coin Edge */}
                <Cylinder args={[2.5, 2.5, 0.3, 64]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
                </Cylinder>
                {/* Coin Face Front */}
                <Cylinder args={[2.5, 2.5, 0.31, 64]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
                </Cylinder>
                {/* Visual Detail (Simple Ring) */}
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.16]}>
                    <ringGeometry args={[2, 2.2, 64]} />
                    <meshStandardMaterial color="#B8860B" />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.16]}>
                    <ringGeometry args={[2, 2.2, 64]} />
                    <meshStandardMaterial color="#B8860B" />
                </mesh>
            </group>
        </Float>
    );
}

function ParticleField() {
    const ref = useRef<any>();

    const sphere = useMemo(() => {
        const temp = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 10 + Math.random() * 20; // Spread logic

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;
        }
        return temp;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#8a2be2"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function ThreeScene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />
                <Coin position={[2, 0, 0]} />
                <ParticleField />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
