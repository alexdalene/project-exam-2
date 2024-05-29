import { Button } from '@/components/ui/button';

import { Html, QuadraticBezierLine } from '@react-three/drei';
import { Plus, User, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EarthMenu = () => {
  const navigate = useNavigate();

  const buttons = [
    {
      icon: <Search size={20} />,
      text: 'Browse',
      href: '/venues',
      position: { x: -2.5, y: 2.3 },
    },
    {
      icon: <Plus size={20} />,
      text: 'Create',
      href: '/venues/create',
      position: { x: 2.5, y: -2.5 },
    },
    {
      icon: <User size={20} />,
      text: 'Account',
      href: '/auth',
      position: { x: -1.6, y: -2.7 },
    },
  ];

  return (
    <>
      {buttons.map((button, index) => (
        <QuadraticBezierLine
          key={index}
          start={[0, 0, 0]}
          end={[button.position.x, button.position.y, 0]}
          color="black"
        />
      ))}

      {buttons.map((button, index) => (
        <Html
          position={[button.position.x, button.position.y, 0]}
          className="flex w-40 list-none flex-col overflow-hidden rounded-xl border border-black/5 bg-gradient-to-br from-stone-100/5 to-stone-200/20 shadow-inner shadow-white/40 backdrop-blur-xl"
          as="ul"
          center
          key={index}
        >
          <Button
            className="flex items-center justify-start gap-4 rounded-none border-b border-black/5 px-4 py-3 font-normal last:border-none hover:bg-white/60"
            onClick={() => navigate(button.href)}
            variant="ghost"
          >
            {button.icon}
            {button.text}
          </Button>
        </Html>
      ))}
    </>
  );
};

export default EarthMenu;
