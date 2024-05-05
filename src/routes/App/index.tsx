import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useTimelineStore } from '@/store/timeline';

const FirstAct = () => {
  const updateAct = useTimelineStore((state) => state.updateAct);

  return (
    <section className="grid min-h-[inherit] grid-cols-2 grid-rows-8 gap-4 px-4 py-3">
      <div className="col-span-2 row-start-6 place-self-center text-center">
        <h1 className="mb-2 text-2xl font-bold uppercase">Holidaze</h1>
        <p className="max-w-[24ch] text-lg text-muted">
          A new and innovative way to explore and create venues.
        </p>
      </div>
      <div className="col-span-2 row-start-7 place-self-center">
        <Button className="hover-slide-right-dark" onClick={() => updateAct(2)}>
          <Link to="/venues" className="flex items-center gap-2">
            Begin <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FirstAct;
