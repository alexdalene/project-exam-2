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

import { useLoaderData } from 'react-router-dom';

const VenuesAll = () => {
  const { venues, meta } = useLoaderData() as {
    venues: VenueType[];
    meta: MetaType;
  };

  return (
    <>
      <div className="grid grid-cols-1 pt-8 md:grid-cols-4">
        {venues.map((venue) => (
          <Venue key={venue.id} {...venue} />
        ))}
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
