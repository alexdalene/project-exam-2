import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useLoadingStore } from '@/store/loading';

const Loading = () => {
  gsap.registerPlugin(useGSAP);

  const containerRef = useRef(null!);
  const { progress } = useProgress();
  const toggleLoading = useLoadingStore((state) => state.toggleLoading);
  const [animationDone, setAnimationDone] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      if (progress === 100) {
        tl.to('#progress', {
          width: `${progress}%`,
          duration: 1,
          ease: 'power1.inOut',
        }).to(containerRef.current, {
          translateY: '-100%',
          duration: 1,
          ease: 'expo.inOut',
          onComplete: () => {
            if (!animationDone) {
              setAnimationDone(true);
            }
          },
        });
      }
    },
    { scope: containerRef, dependencies: [progress] },
  );

  useEffect(() => {
    if (animationDone) {
      toggleLoading();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationDone]);

  return (
    <div
      className="fixed left-0 top-0 z-50 grid min-h-[100svh] w-full place-content-center bg-background"
      ref={containerRef}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="text-2xl font-semibold">{progress} %</span>
        <div className="relative h-2 w-[200px] overflow-hidden rounded-lg bg-muted-foreground">
          <div
            id="progress"
            className="absolute bottom-0 left-0 top-0 h-2 bg-foreground"
          ></div>
        </div>
        {(progress !== 100 && <span className="text-lg">Hold on...</span>) || (
          <span className="text-lg">Done.</span>
        )}
      </div>
    </div>
  );
};

export default Loading;
