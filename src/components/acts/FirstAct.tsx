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
        <Button
          variant="test"
          className="gap-2 rounded-xl border border-black/5 bg-gradient-to-br from-stone-100/5 to-stone-200/20 text-sm font-medium shadow-inner shadow-white/10 backdrop-blur-xl"
          onClick={() => updateAct(2)}
        >
          Begin <ArrowRight size={14} />
        </Button>
      </div>
    </>
  );
};

export default FirstAct;
