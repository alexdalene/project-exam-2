import useStore from '@/store/venueStore';

import Venue from '@/components/Venue';
import PaginationComponent from '@/components/Pagination';

import { useEffect } from 'react';

const VenuesAll = () => {
  const { venues, meta, loading, error, fetchVenues } = useStore();

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
          {venues.map((venue) => (
            <Venue key={venue.id} {...venue} />
          ))}
        </div>
      )}

      {meta && <PaginationComponent meta={meta} />}
    </>
  );
};

export default VenuesAll;
