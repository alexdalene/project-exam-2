import useStore from '@/store/venueStore';
import { useFilterState } from '@/hooks/useFilterState';

import FilterPanel from '@/components/filter/FilterPanel';
import { Input } from '@/components/ui/input';

import { useEffect, useState } from 'react';

const Search = () => {
  const { searchVenues, fetchAllVenues } = useStore();
  const [isQueryChanged, setIsQueryChanged] = useState(false);
  const { price, amenities, guests, query, page, setFilterState } =
    useFilterState();

  useEffect(() => {
    const filterCriteria = { price, amenities, guests, query };

    if (query !== '') {
      searchVenues(query, filterCriteria);
      setIsQueryChanged(true);
    } else if (isQueryChanged) {
      fetchAllVenues(page, filterCriteria);
    }
  }, [query, searchVenues, fetchAllVenues, isQueryChanged]);

  return (
    <div className="mx-auto flex w-full max-w-[768px] gap-4 border-b border-accent px-4 pb-8 pt-20">
      <div className="flex w-full gap-4">
        <Input
          placeholder="Search..."
          className="h-12 text-base"
          name="q"
          id="q"
          aria-label="Search for venues"
          value={query}
          onChange={(e) =>
            setFilterState({ price, amenities, guests, query: e.target.value })
          }
          autoComplete="off"
        />

        <FilterPanel />
      </div>
    </div>
  );
};

export default Search;
