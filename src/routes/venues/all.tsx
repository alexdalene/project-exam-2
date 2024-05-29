import useStore from '@/store/venueStore';
import { useFilterState } from '@/hooks/useFilterState';
import { useVenueFilter } from '@/hooks/useVenueFilter';

import Venue from '@/components/Venue';
import PaginationComponent from '@/components/Pagination';
import Search from '@/components/Search';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

import { useEffect } from 'react';

const VenuesAll = () => {
  const { venues, meta, loading, error, fetchAllVenues, searchVenues } =
    useStore();
  const { price, amenities, guests, query, page } = useFilterState();
  const { resetFiltersAndFetchVenues } = useVenueFilter();

  useEffect(() => {
    if (query !== '') {
      searchVenues(query, { price, amenities, guests });
    } else {
      fetchAllVenues(page, { price, amenities, guests });
    }
  }, [searchVenues, fetchAllVenues]);

  return (
    <>
      <Search />
      {error && <div>Error: {error}</div>}
      {!error && (
        <>
          <div
            className="grid grid-cols-1 gap-x-4 gap-y-8 px-4 pt-8 sm:grid-cols-2  md:grid-cols-3 md:px-8 lg:grid-cols-4 lg:px-16"
            aria-busy={loading}
            aria-live="polite"
          >
            {venues.length > 0 &&
              venues.map((venue) => <Venue key={venue.id} {...venue} />)}
          </div>
          {venues.length <= 0 && !loading && (
            <div className="mx-auto flex w-fit flex-col items-center gap-8 font-medium">
              Sorry, no venues matched your search.
              <Button
                variant="outline"
                onClick={() => {
                  resetFiltersAndFetchVenues();
                }}
              >
                Reset filters
              </Button>
            </div>
          )}{' '}
        </>
      )}

      <Separator className="mt-8" />
      {meta &&
        venues.length > 0 &&
        query === '' &&
        price[0] === 100 &&
        price[1] === 5000 &&
        amenities.length === 0 &&
        guests === '' && <PaginationComponent meta={meta} />}
    </>
  );
};

export default VenuesAll;
