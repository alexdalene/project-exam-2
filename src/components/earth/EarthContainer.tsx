import { Canvas } from '@react-three/fiber';
import Earth from '@/components/earth/Earth';

const EarthContainer = () => {
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 20] }}>
      <Earth />
    </Canvas>
  );
};

export default EarthContainer;
