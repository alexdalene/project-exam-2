import useStore from '@/store/venueStore';

import Venue from '@/components/Venue';
import PaginationComponent from '@/components/Pagination';

import { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

const VenuesAll = () => {
  const {
    venues,
    filteredVenues,
    meta,
    loading,
    error,
    fetchVenues,
    filtered,
  } = useStore();

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return (
    <>
      {error && <div>Error: {error}</div>}
      {!error && (
        <div
          className="grid grid-cols-1 gap-x-4 gap-y-8 px-4 pt-8 sm:grid-cols-2 md:grid-cols-3 md:px-8 lg:grid-cols-4 lg:px-16"
          aria-busy={loading}
          aria-live="polite"
        >
          {filteredVenues.length === 0
            ? venues.map((venue) => <Venue key={venue.id} {...venue} />)
            : filteredVenues.map((venue) => (
                <Venue key={venue.id} {...venue} />
              ))}
        </div>
      )}

      {!filtered && <Separator className="mt-8" />}
      {meta && !filtered && <PaginationComponent meta={meta} />}
    </>
  );
};

export default VenuesAll;
