import { useSearchStore } from '@/store/search';
import useStore from '@/store/venueStore';

import FilterPanel from '@/components/filter/FilterPanel';
import { Input } from '@/components/ui/input';

import { useEffect, useState } from 'react';

const Search = () => {
  const { query, updateQuery } = useSearchStore();
  const { searchVenues, fetchAllVenues } = useStore();
  const [isQueryChanged, setIsQueryChanged] = useState(false);

  useEffect(() => {
    if (query.trim() !== '') {
      searchVenues(query);
      setIsQueryChanged(true);
    } else if (isQueryChanged) {
      fetchAllVenues();
    }
  }, [query, searchVenues, fetchAllVenues, isQueryChanged]);

  return (
    <div className="mx-auto flex w-full max-w-[768px] gap-4 border-b border-accent px-4 pb-8 pt-20">
      <Input
        placeholder="Search..."
        className="h-12 text-base"
        name="q"
        id="q"
        aria-label="Search for venues"
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        autoComplete="off"
      />

      <FilterPanel />
    </div>
  );
};

export default Search;
