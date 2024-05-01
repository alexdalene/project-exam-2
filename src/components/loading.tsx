import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useProgress } from '@react-three/drei';

const Loading = () => {
  gsap.registerPlugin(useGSAP);

  const containerRef = useRef<HTMLDivElement>(null!);

  const { progress } = useProgress();

  const tl = gsap.timeline();

  useGSAP(
    () => {
      tl.to('#progress', {
        width: `${progress}%`,
        duration: 2,
        ease: 'power2.inOut',
      }).to(containerRef.current, {
        translateY: '-100%',
        duration: 1,
        ease: 'power2.inOut',
        delay: 0.2,
        onComplete: () => {
          containerRef.current.style.display = 'none';
        },
      });
    },
    { scope: containerRef, dependencies: [progress] },
  );

  return (
    <div
      className="fixed left-0 top-0 z-50 grid min-h-[100svh] w-full place-content-center bg-background"
      ref={containerRef}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="text-2xl font-semibold">
          {progress} %
        </span>
        <div className="relative h-2 w-[200px] overflow-hidden rounded-lg bg-muted-foreground">
          <div
            id="progress"
            className="absolute bottom-0 left-0 top-0 h-2 bg-foreground"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
