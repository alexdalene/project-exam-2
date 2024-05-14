import { useVenueStore } from '@/store/venues';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import VenueGrid from '@/components/venue/VenueGrid';
import FilterPanel from '@/components/filter/FilterPanel';
import { Venue } from '@/types/venue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const VenuePanel = ({ venues }: { venues: Venue[] }) => {
  return (
    <>
      <div className="grid grid-cols-1 pt-8 md:grid-cols-4">
        {venues.map((venue) => (
          <VenueGrid key={venue.id} {...venue} />
        ))}
      </div>
    </>
  );
};

const Venues = () => {
  const fetchVenues = useVenueStore((state) => state.fetchVenues);
  const venues = useVenueStore((state) => state.venues);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return (
    <>
      <div className="flex flex-col">
        <div className="mx-auto flex w-full max-w-[768px] gap-4 border-b border-accent px-4 pb-8 pt-20">
          <Input placeholder="Search..." className="h-12 text-base" />
          <FilterPanel />
          <Button className="h-12">Search</Button>
        </div>

        <div className="mx-auto w-full max-w-[1100px]">
          <VenuePanel venues={venues} />

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious to="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink to="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext to="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default Venues;
