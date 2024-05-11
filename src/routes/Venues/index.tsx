import { useVenueStore } from '@/store/venues';
import { useSearchStore } from '@/store/search';

import Search from '@/components/Search';
import VenueGrid from '@/components/venue/VenueGrid';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Venues = () => {
  const fetchVenues = useVenueStore((state) => state.fetchVenues);
  const venues = useVenueStore((state) => state.venues);
  const view = useSearchStore((state) => state.view);

  const sectionRef = useRef<HTMLDivElement>(null!);

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: 'power4.out',
    });
  });

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return (
    <>
      <section
        className="min-h-dvh w-full bg-background pt-20"
        ref={sectionRef}
      >
        <div className="mx-auto mb-8 max-w-[1100px] px-4 pt-16">
          <h1 className="mb-2 text-xl uppercase">Venues</h1>
          <p className="max-w-[30ch] font-medium text-muted">
            Look through hundreds of venues from all over the world.
          </p>
        </div>

        <Search />

        <div className="mx-auto max-w-[1100px] md:px-4">
          {view === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 gap-y-8 md:grid-cols-3">
              {venues.map((venue) => (
                <VenueGrid key={venue.id} {...venue} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {venues.map((venue) => (
                <div key={venue.id}>
                  <img
                    src={venue.media[0]?.url}
                    alt={venue.media[0]?.alt}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Venues;
