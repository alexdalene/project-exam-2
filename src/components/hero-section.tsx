import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useProgress } from '@react-three/drei';

import { useRef } from 'react';

import { useAnimationStore } from '@/store/animation';

const Hero = () => {
  gsap.registerPlugin(useGSAP);

  const sectionRef = useRef(null!);
  const { progress } = useProgress();

  const toggleAnimation = useAnimationStore(
    (state) => state.toggleAnimation,
  );

  const isAnimating = useAnimationStore(
    (state) => state.isAnimating,
  );

  const toggleFinished = useAnimationStore(
    (state) => state.toggleFinished,
  );

  useGSAP(
    () => {
      if (progress === 100) {
        gsap.from('h1', {
          delay: 1.2,
          opacity: 0,
          y: 100,
          duration: 1,
        });
      }
    },
    { scope: sectionRef, dependencies: [progress] },
  );

  const { contextSafe } = useGSAP({ scope: sectionRef });

  const hideHero = contextSafe(() => {
    gsap.to(sectionRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: toggleFinished,
    });
  });

  if (isAnimating) {
    hideHero();
  }

  return (
    <section
      className="flex min-h-[100dvh] w-full flex-col justify-between px-4 py-16"
      ref={sectionRef}
    >
      <h1 className=" text-5xl">
        We'll help you{' '}
        <span className="font-bold">find / create </span>
        the perfect venue.
      </h1>

      <Button
        variant="primary"
        size="lg"
        className="btn-hover-slide-right group"
        onClick={toggleAnimation}
      >
        <span className="z-10 transition group-hover:text-foreground">
          <ArrowRight />
        </span>
      </Button>
    </section>
  );
};

export default Hero;
