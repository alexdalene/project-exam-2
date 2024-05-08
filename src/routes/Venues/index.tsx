import { useLoadingStore } from '@/store/loading';
import { useTimelineStore } from '@/store/timeline';
import { useVenueStore } from '@/store/venues';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Venues = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const updateAct = useTimelineStore((state) => state.updateAct);
  const fetchVenues = useVenueStore((state) => state.fetchVenues);
  const venues = useVenueStore((state) => state.venues);

  const sectionRef = useRef<HTMLDivElement>(null!);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: 'power4.out',
    });
  });

  useEffect(() => {
    if (!isLoading) {
      updateAct(3);
      fetchVenues();
    }
  }, [isLoading, updateAct, fetchVenues]);

  console.log(venues);

  return (
    <section
      className="row-span-5 min-h-dvh w-full bg-background"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-[1100px] px-4 py-28">
        <h1 className="mb-2 text-xl uppercase">Venues</h1>
        <p className="max-w-[30ch] font-medium text-muted">
          Look through hundreds of venues from all over the world.
        </p>
      </div>
    </section>
  );
};

export default Venues;
