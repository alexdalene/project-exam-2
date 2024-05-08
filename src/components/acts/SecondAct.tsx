import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, SearchIcon } from 'lucide-react';

import { useContinentStore } from '@/store/continent';
import { useTimelineStore } from '@/store/timeline';
import { Link } from 'react-router-dom';

const SecondAct = () => {
  const nextContinent = useContinentStore((state) => state.nextContinent);
  const prevContinent = useContinentStore((state) => state.prevContinent);
  const continent = useContinentStore((state) => state.continent);
  const updateAct = useTimelineStore((state) => state.updateAct);

  return (
    <>
      <div className="row-start-2 self-start text-center">
        <h1 className="mb-2 text-2xl font-bold uppercase">{continent.name}</h1>
      </div>
      <div className="row-start-4 flex w-full items-center justify-center gap-4 self-end">
        <Button
          className="hover-slide-left-dark"
          onClick={() => prevContinent()}
        >
          <ArrowLeft />
        </Button>
        <Button
          className="hover-slide-right-dark"
          onClick={() => nextContinent()}
        >
          <ArrowRight />
        </Button>
      </div>
      <div className="row-start-3 place-self-center">
        <Link to="/venues">
          <Button
            className="border-none bg-background/40 text-background backdrop-blur-sm"
            onClick={() => updateAct(3)}
          >
            <SearchIcon />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SecondAct;
