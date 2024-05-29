import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { MetaType } from '@/types/response';
import { useEffect } from 'react';
import { useFilterState } from '@/hooks/useFilterState';
import { useSearchParams } from 'react-router-dom';
import useStore from '@/store/venueStore';

const PaginationComponent = ({ meta }: { meta: MetaType }) => {
  const { price, amenities, guests, page, setFilterState } = useFilterState();
  const [searchParams] = useSearchParams();
  const { fetchAllVenues } = useStore();

  useEffect(() => {
    if (page !== meta.currentPage) {
      setFilterState({ page: meta.currentPage });
    }
  }, [meta.currentPage]);

  const handlePageChange = (newPage: number | null) => {
    if (newPage !== null) {
      setFilterState({ page: newPage });
      fetchAllVenues(newPage, { price, amenities, guests });
    }
  };

  const generateUrlWithPage = (newPage: number | null) => {
    const params = new URLSearchParams(searchParams);

    if (newPage) {
      params.set('page', newPage.toString());
    }
    return `?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {!meta.isFirstPage && (
          <>
            <PaginationItem>
              <PaginationPrevious
                to={generateUrlWithPage(meta.previousPage)}
                onClick={() => handlePageChange(meta.previousPage)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                to={generateUrlWithPage(meta.previousPage)}
                onClick={() => handlePageChange(meta.previousPage)}
              >
                {meta.previousPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink
            to={generateUrlWithPage(meta.currentPage)}
            isActive
            onClick={() => handlePageChange(meta.currentPage)}
          >
            {meta.currentPage}
          </PaginationLink>
        </PaginationItem>
        {!meta.isLastPage && (
          <>
            <PaginationItem>
              <PaginationLink
                to={generateUrlWithPage(meta.nextPage)}
                onClick={() => handlePageChange(meta.nextPage)}
              >
                {meta.nextPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                to={generateUrlWithPage(meta.nextPage)}
                onClick={() => handlePageChange(meta.nextPage)}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
