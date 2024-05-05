import { useVenueStore } from '@/store/venues';
import { useLoadingStore } from '@/store/loading';
import { useTimelineStore } from '@/store/timeline';

import { useEffect } from 'react';

import Venue from '@/components/venues/Venue';

const Venues = () => {
  const fetchVenues = useVenueStore((state) => state.fetchVenues);
  const venues = useVenueStore((state) => state.venues);

  const isLoading = useLoadingStore((state) => state.isLoading);
  const updateAct = useTimelineStore((state) => state.updateAct);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  useEffect(() => {
    if (!isLoading) {
      updateAct(2);
    }
  }, [isLoading, updateAct]);

  const midIndex = Math.ceil(venues.length / 2);
  const firstHalf = venues.slice(0, midIndex);
  const secondHalf = venues.slice(midIndex);

  return (
    <div className="grid min-h-[inherit] grid-cols-2 gap-4 px-4 py-3">
      {/* First half */}
      <div className="grid gap-16">
        {firstHalf.map((venue) => {
          return <Venue key={venue.id} {...venue} />;
        })}
      </div>

      {/* Second half */}
      <div className="grid gap-16">
        {secondHalf.map((venue) => {
          return <Venue key={venue.id} {...venue} />;
        })}
      </div>
    </div>
  );
};

export default Venues;
