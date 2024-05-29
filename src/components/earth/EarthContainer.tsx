import Earth from '@/components/earth/Earth';

import { Canvas } from '@react-three/fiber';

const EarthContainer = () => {
  return (
    <div className="fixed left-0 top-0 z-0 h-full w-full">
      <Canvas camera={{ fov: 45, position: [0, 0, 20] }}>
        <Earth />
      </Canvas>
    </div>
  );
};

export default EarthContainer;
