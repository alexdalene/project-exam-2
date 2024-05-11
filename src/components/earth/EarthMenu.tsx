import { Button } from '@/components/ui/button';

import { Html } from '@react-three/drei';
import { Plus, User, Search } from 'lucide-react';

import { useTimelineStore } from '@/store/timeline';

const EarthMenu = () => {
  const isActFinished = useTimelineStore((state) => state.isActFinished);

  const buttons = [
    {
      icon: <Search />,
      text: 'Browse',
      position: { x: -1.5, y: 1.3 },
    },
    {
      icon: <Plus />,
      text: 'Create',
      position: { x: 1.5, y: -1.5 },
    },
    {
      icon: <User />,
      text: 'Account',
      position: { x: -0.6, y: -1.7 },
    },
  ];

  return (
    <group>
      {buttons.map((button, index) => (
        <Html
          key={index}
          position={[button.position.x, button.position.y, 0]}
          center
        >
          <Button
            variant="glass"
            style={{
              transition: 'opacity 0.6s ease-in-out',
              willChange: 'opacity',
              opacity: isActFinished ? 1 : 0,
            }}
          >
            {button.icon}
            {button.text}
          </Button>
        </Html>
      ))}
    </group>
  );
};

export default EarthMenu;
