import { useLoadingStore } from './store/loading';

import { Progress } from '@/components/ui/progress';

import { useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const LoadingPage = () => {
  const { progress, active } = useProgress();
  const toggleLoading = useLoadingStore((state) => state.toggleLoading);
  const progressRef = useRef<HTMLDivElement>(null!);
  const sectionRef = useRef<HTMLDivElement>(null!);

  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      if (!active && progress === 100) {
        tl.to(progressRef.current, {
          width: 0,
          duration: 0.6,
          delay: 1,
          ease: 'expo.inOut',
        });

        tl.to(sectionRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'expo.inOut',
          onComplete: () => {
            toggleLoading();
          },
        });
      }
    },
    { dependencies: [active, progress], scope: sectionRef },
  );

  return (
    <div
      className="fixed inset-0 z-50 grid min-h-dvh place-content-center bg-background"
      ref={sectionRef}
    >
      <div className="flex w-60 justify-center">
        <Progress ref={progressRef} value={progress} />
      </div>
    </div>
  );
};

export default LoadingPage;
