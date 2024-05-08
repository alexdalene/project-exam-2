import { useLoadingStore } from '@/store/loading';
import { useTimelineStore } from '@/store/timeline';
import { useVenueStore } from '@/store/venues';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Search from '@/components/Search';

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
    <>
      <section
        className="min-h-dvh w-full bg-background pt-20"
        ref={sectionRef}
      >
        <div className="max-w-[1100px] px-4 py-16">
          <h1 className="mb-2 text-xl uppercase">Venues</h1>
          <p className="max-w-[30ch] font-medium text-muted">
            Look through hundreds of venues from all over the world.
          </p>
        </div>

        <Search />

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 px-4 md:grid-cols-3">
          {venues.map((venue) => {
            return (
              <div key={venue.id}>
                <img src={venue.media[0]?.url} alt={venue.media[0]?.alt} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Venues;
