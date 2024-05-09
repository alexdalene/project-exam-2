import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Grid2X2, List } from 'lucide-react';
import { useSearchStore } from '@/store/search';

const Search = () => {
  const { search, view, setSearch, setView } = useSearchStore((state) => ({
    search: state.search,
    view: state.view,
    setSearch: state.setSearch,
    setView: state.setView,
  }));

  const views = ['grid', 'list'];

  return (
    <form
      className="mx-auto mb-16 flex h-12 max-w-[1100px] gap-4 px-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="h-full max-w-[600px] rounded-2xl border-none bg-accent text-base font-medium placeholder:font-medium placeholder:text-muted focus-visible:bg-popover focus-visible:ring-1 focus-visible:ring-stone-200"
      />
      <div className="flex gap-2">
        {views.map((v) => (
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
        ))}
      </div>
    </form>
  );
};

export default Search;
