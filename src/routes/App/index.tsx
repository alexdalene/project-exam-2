import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useTimelineStore } from '@/store/timeline';
import { useLoadingStore } from '@/store/loading';

import { useEffect } from 'react';

const FirstAct = () => {
  const updateAct = useTimelineStore((state) => state.updateAct);
  const isLoading = useLoadingStore((state) => state.isLoading);

  useEffect(() => {
    if (!isLoading) {
      updateAct(1);
    }
  }, [isLoading, updateAct]);

  return (
    <section className="grid min-h-[inherit] grid-rows-5 px-4 py-3">
      <div className="row-start-4 place-self-center text-center">
        <h1 className="mb-2 text-2xl font-bold uppercase">Holidaze</h1>
        <p className="max-w-[24ch] text-lg text-muted">
          A new and innovative way to explore and create venues.
        </p>
      </div>
      <div className="row-start-5 self-start justify-self-center">
        <Link to="/venues">
          <Button
            className="hover-slide-right-dark"
            onClick={() => updateAct(2)}
          >
            Begin <ArrowRight />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FirstAct;
