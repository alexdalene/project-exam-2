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
      className="grid min-h-[100dvh] place-content-center gap-8 px-4"
      ref={sectionRef}
    >
      <h1 className="max-w-[14ch] text-center text-4xl font-semibold">
        What would you like to do?
      </h1>
      <div className="flex flex-col gap-4">
        <Button
          variant="primary"
          size="lg"
          className="btn-hover-slide-right-outline group self-center border-foreground before:bg-foreground"
        >
          <span className="z-10 flex items-center gap-2 text-foreground transition group-hover:text-background">
            <ArrowRight />
            Browse
          </span>
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="btn-hover-slide-right-outline group self-center border-foreground before:bg-foreground"
        >
          <span className="z-10 flex items-center gap-2 text-foreground transition group-hover:text-background">
            <ArrowRight />
            Create
          </span>
        </Button>
      </div>
    </section>
  );
};

export default Menu;
