import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const ThirdAct = () => {
  const sectionRef = useRef<HTMLDivElement>(null!);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: 'power4.out',
    });
  });

  return (
    <>
      <div
        className="row-span-5 w-full bg-background text-center"
        ref={sectionRef}
      ></div>
    </>
  );
};

export default ThirdAct;
