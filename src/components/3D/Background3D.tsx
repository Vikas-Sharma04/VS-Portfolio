import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import FloatingGeometry from './FloatingGeometry';
import ParticleField from './ParticleField';

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.3} />
          <pointLight position={[-10, -10, -10]} intensity={0.2} color="#8b5cf6" />
          
          <Stars
            radius={300}
            depth={60}
            count={1000}
            factor={7}
            saturation={0}
            fade
          />
          
          <FloatingGeometry />
          <ParticleField />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3D;
