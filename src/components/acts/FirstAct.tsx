import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import { useTimelineStore } from '@/store/timeline';

const FirstAct = () => {
  const updateAct = useTimelineStore((state) => state.updateAct);

  return (
    <>
      <div className="row-start-4 place-self-center text-center">
        <h1 className="mb-2 text-2xl uppercase">Holidaze</h1>
        <p className="max-w-[24ch] text-lg font-medium text-muted">
          A new and innovative way to explore and create venues.
        </p>
      </div>
      <div className="row-start-5 self-start justify-self-center">
        <Button variant="glass" onClick={() => updateAct(2)}>
          Begin <ArrowRight size={14} />
        </Button>
      </div>
    </>
  );
};

export default FirstAct;
