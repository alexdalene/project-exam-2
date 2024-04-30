import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useRef } from 'react';

const Earth = () => {
  const cubeRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
  });

  return (
    <>
      <pointLight position={[1, 1, 3]} />
      <mesh ref={cubeRef} rotation-y={Math.PI * 0.25}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

export default Earth;
