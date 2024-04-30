import { Canvas } from '@react-three/fiber';
import Earth from '@/components/earth/earth';

const EarthContainer = () => {
  return (
    <Canvas>
      <Earth />
    </Canvas>
  );
};

export default EarthContainer;
