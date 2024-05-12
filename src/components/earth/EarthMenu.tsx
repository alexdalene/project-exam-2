import { useTimelineStore } from '@/store/timeline';

import { Button } from '@/components/ui/button';

import { Html } from '@react-three/drei';
import { Plus, User, Search } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EarthMenu = () => {
  const isActFinished = useTimelineStore((state) => state.isActFinished);
  const toggleActFinished = useTimelineStore(
    (state) => state.toggleActFinished,
  );

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      toggleActFinished();
    };
  }, []);

  const buttons = [
    {
      icon: <Search size={20} />,
      text: 'Browse',
      href: '/venues',
      position: { x: -1.5, y: 1.3 },
    },
    {
      icon: <Plus size={20} />,
      text: 'Create',
      href: '/venues/create',
      position: { x: 1.5, y: -1.5 },
    },
    {
      icon: <User size={20} />,
      text: 'Account',
      href: '/account',
      position: { x: -0.6, y: -1.7 },
    },
  ];

  return (
    <>
      <Html
        position={[1.5, 0.5, 0]}
        style={{
          transition: 'opacity 0.6s ease-in-out',
          willChange: 'opacity',
          opacity: isActFinished ? 1 : 0,
        }}
        className="flex w-40 list-none flex-col overflow-hidden rounded-xl border border-black/5 bg-gradient-to-br from-stone-100/5 to-stone-200/20 shadow-inner shadow-white/40 backdrop-blur-xl"
        as="ul"
        center
      >
        {buttons.map((button, index) => (
          <Button
            key={index}
            className="flex items-center justify-start gap-4 rounded-none border-b border-black/5 px-4 py-3 font-normal last:border-none hover:bg-white/60"
            onClick={() => navigate(button.href)}
            variant="ghost"
          >
            {button.icon}
            {button.text}
          </Button>
        ))}
      </Html>
    </>
  );
};

export default EarthMenu;
