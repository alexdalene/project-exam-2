import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import { useTimelineStore } from '@/store/timeline';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const FirstAct = () => {
  const updateAct = useTimelineStore((state) => state.updateAct);

  const sectionRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(useGSAP);

  const { contextSafe } = useGSAP({ dependencies: [sectionRef] });

  const animateOut = contextSafe(() => {
    gsap.to(sectionRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.6,
      ease: 'expo.inOut',
      onComplete: () => {
        updateAct(2);
      },
    });
  });

  return (
    <section className="grid min-h-[inherit] grid-rows-5" ref={sectionRef}>
      <div className="row-start-4 max-w-[350px] place-self-center text-center">
        <h1 className="mb-2 text-2xl uppercase">Holidaze</h1>
        <p className="text-balance text-muted-foreground">
          A new and innovative way to explore and create venues.
        </p>
      </div>
      <div className="row-start-5 self-start justify-self-center">
        <Button onClick={() => animateOut()}>
          <ArrowRight size={20} />
          Begin
        </Button>
      </div>
    </section>
  );
};

export default FirstAct;
