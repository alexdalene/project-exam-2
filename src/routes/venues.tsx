import { useSearchStore } from '@/store/search';

import FilterPanel from '@/components/filter/FilterPanel';
import { Input } from '@/components/ui/input';

import { Outlet } from 'react-router-dom';

const Venues = () => {
  const { query, updateQuery } = useSearchStore();

  return (
    <div className="flex flex-col">
      <div className="mx-auto flex w-full max-w-[768px] gap-4 border-b border-accent px-4 pb-8 pt-20">
        <Input
          placeholder="Search..."
          className="h-12 text-base"
          name="q"
          id="q"
          aria-label="Search for venues"
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
        />

        <FilterPanel />
      </div>

      <div className="mx-auto w-full max-w-[1400px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Venues;