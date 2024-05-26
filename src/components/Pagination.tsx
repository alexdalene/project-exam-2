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

const PaginationComponent = ({ meta }: { meta: MetaType }) => {
  const { page, setFilterState } = useFilterState();

  useEffect(() => {
    if (page !== meta.currentPage) {
      setFilterState({ page: meta.currentPage || 1 });
    }
  }, [meta.currentPage]);

  return (
    <Pagination>
      <PaginationContent>
        {!meta.isFirstPage && (
          <>
            <PaginationItem>
              <PaginationPrevious
                to={`?page=${meta.previousPage}`}
                onClick={() => setFilterState({ page: meta.previousPage })}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                to={`?page=${meta.previousPage}`}
                onClick={() => setFilterState({ page: meta.previousPage })}
              >
                {meta.previousPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink
            to={`?page=${meta.currentPage}`}
            isActive
            onClick={() => setFilterState({ page: meta.currentPage })}
          >
            {meta.currentPage}
          </PaginationLink>
        </PaginationItem>
        {!meta.isLastPage && (
          <>
            <PaginationItem>
              <PaginationLink
                to={`?page=${meta.nextPage}`}
                onClick={() => setFilterState({ page: meta.nextPage })}
              >
                {meta.nextPage}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                to={`?page=${meta.nextPage}`}
                onClick={() => setFilterState({ page: meta.nextPage })}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
