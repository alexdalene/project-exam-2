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

const PaginationComponent = ({ meta }: { meta: MetaType }) => (
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
);

export default PaginationComponent;
