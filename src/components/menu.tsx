import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Menu = () => {
  const sectionRef = useRef(null!);

  useGSAP(
    () => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        delay: 0.2,
        y: 100,
        duration: 1,
        ease: 'power2.inOut',
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      className="mt-16 min-h-[100dvh] px-4"
      ref={sectionRef}
    >
      <h1 className="max-w-[20ch] text-lg font-semibold">
        What would you like to do?
      </h1>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <Button
          variant="primary"
          className="flex items-center gap-2"
        >
          <span>Explore the venues</span>
          <ArrowRight />
        </Button>
        <Button
          variant="primary"
          className="flex items-center gap-2"
        >
          <span>Create your own</span>
          <ArrowRight />
        </Button>
        <Button
          variant="primary"
          className="flex items-center gap-2"
        >
          <span>Manage your acccount</span>
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default Menu;
