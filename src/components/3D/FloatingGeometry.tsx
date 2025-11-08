
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const FloatingGeometry = () => {
  const meshRef = useRef<Mesh>(null);
  const torusRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 2;
      meshRef.current.rotation.y = Math.sin(t / 4) / 2;
      meshRef.current.position.y = Math.sin(t) / 2;
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01;
      torusRef.current.rotation.y += 0.005;
      torusRef.current.position.x = Math.cos(t / 3) * 3;
    }
    
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t / 2) * 2;
      sphereRef.current.position.z = Math.cos(t / 2) * 2;
    }
  });

  return (
    <>
      {/* Main rotating cube */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#00bcd4"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
      
      {/* Floating torus */}
      <mesh ref={torusRef} position={[3, 1, -2]}>
        <torusGeometry args={[0.5, 0.2, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
      
      {/* Moving sphere */}
      <mesh ref={sphereRef} position={[-2, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#e91e63"
          transparent
          opacity={0.5}
          wireframe
        />
      </mesh>
    </>
  );
};

export default FloatingGeometry;
