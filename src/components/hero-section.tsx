import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useRef } from 'react';

const Hero = () => {
  gsap.registerPlugin(useGSAP);

  const sectionRef = useRef(null!);

  useGSAP(() => {
    gsap.from('h1', {
      opacity: 0,
      y: 100,
      duration: 1,
    });
  });

  return (
    <section
      className="flex min-h-[100svh] w-full flex-col justify-between px-4 py-16"
      ref={sectionRef}
    >
      <h1 className=" text-5xl font-semibold text-muted">
        We'll help you{' '}
        <span className="text-foreground">
          find / create{' '}
        </span>
        the perfect venue.
      </h1>

      <Button
        variant="primary"
        size="lg"
        className="btn-hover-slide-right group"
      >
        <span className="z-10 transition group-hover:text-foreground">
          <ArrowRight />
        </span>
      </Button>
    </section>
  );
};

export default Hero;
