import { useTimelineStore } from '@/store/timeline';

import Earth from '@/components/earth/Earth';

import { Canvas } from '@react-three/fiber';

const EarthContainer = () => {
  const currentAct = useTimelineStore((state) => state.currentAct);

  return (
    <div
      className="fixed left-0 top-0 h-full w-full"
      style={currentAct === 1 ? { zIndex: -10 } : { zIndex: 0 }}
    >
      <Canvas camera={{ fov: 45, position: [0, 0, 20] }}>
        <Earth />
      </Canvas>
    </div>
  );
};

export default EarthContainer;
