import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Venue from '@/components/Venue';

import type { VenueType } from '@/types/venue';
import type { MetaType } from '@/types/response';

import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';

const VenuesAll = () => {
  const { venues, meta } = useLoaderData() as {
    venues: VenueType[];
    meta: MetaType;
  };

  const [filteredVenues, setFilteredVenues] = useState<VenueType[]>(venues);

  const { filters } = useRouteLoaderData('venues') as {
    filters: { price: string; amenities: string; guests: string };
  };

  useEffect(() => {
    if (filters) {
      const filtered = venues.filter((venue) => {
        if (filters.price) {
          if (venue.price > parseInt(filters.price)) {
            return false;
          }
        }

        if (filters.amenities) {
          const amenities = filters.amenities.split(',');

          for (const amenity of amenities) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (!venue.meta[amenity]) {
              return false;
            }
          }
        }

        if (filters.guests) {
          if (venue.maxGuests < parseInt(filters.guests)) {
            return false;
          }
        }

        return true;
      });

      setFilteredVenues(filtered);
    }
  }, [filters, venues]);

  console.log(filteredVenues);

  return (
    <>
      <div className="grid grid-cols-1 pt-8 md:grid-cols-4">
        {!filteredVenues
          ? venues.map((venue) => <Venue key={venue.id} {...venue} />)
          : filteredVenues.map((venue) => <Venue key={venue.id} {...venue} />)}
      </div>

      <Pagination>
        <PaginationContent>
          {!meta.isFirstPage && (
            <>
              <PaginationItem>
                <PaginationPrevious to={`?page=${meta.previousPage}`} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink to={`?page=${meta.previousPage}`}>
                  {meta.previousPage}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink to={`?page=${meta.currentPage}`} isActive>
              {meta.currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to={`?page=${meta.nextPage}`}>
              {meta.nextPage}
            </PaginationLink>
          </PaginationItem>
          {!meta.isLastPage && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext to={`?page=${meta.nextPage}`} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default VenuesAll;
