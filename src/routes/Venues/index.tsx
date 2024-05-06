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

  return (
    <div className="grid min-h-[inherit] gap-16 px-4 py-3">
      {venues.map((venue) => {
        return <Venue key={venue.id} {...venue} />;
      })}
    </div>
  );
};

export default Venues;
