import { useSearchStore } from '@/store/search';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useState, useEffect } from 'react';
import { Grid2X2, List } from 'lucide-react';
import { useDebounce } from 'use-debounce';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue] = useDebounce(inputValue, 500);

  const { view, setSearch, setView } = useSearchStore((state) => ({
    view: state.view,
    setSearch: state.setSearch,
    setView: state.setView,
  }));

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue]);

  const views = ['grid', 'list'];

  return (
    <form
      className="mx-auto mb-16 flex h-12 max-w-[1100px] gap-4 px-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        placeholder="Search for a venue..."
        className="h-full max-w-[600px] rounded-2xl border-none bg-accent text-base placeholder:text-muted focus-visible:bg-popover focus-visible:ring-1 focus-visible:ring-muted-foreground focus-visible:ring-offset-0"
      />

      <div className="flex gap-2">
        {!isOpen ? (
          views.map((v) => (
            <Button
              key={v}
              aria-label={v + ' view'}
              variant="secondary"
              size="icon"
              onClick={() => setView(v)}
              type="button"
              className={view === v ? 'text-foreground' : 'text-muted'}
            >
              {v === 'grid' ? <Grid2X2 /> : <List />}
            </Button>
          ))
        ) : (
          <Button
            variant="link"
            onClick={() => setIsOpen(false)}
            type="button"
            className="px-2 text-blue-500"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default Search;
