import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FirstAct = () => {
  return (
    <section className="grid min-h-[inherit] grid-rows-5 px-4 py-3">
      <div className="row-start-4 place-self-center text-center">
        <h1 className="mb-2 text-2xl font-bold uppercase">Holidaze</h1>
        <p className="max-w-[24ch] text-lg text-muted">
          A new and innovative way to explore & create venues.
        </p>
      </div>
      <div className="row-start-5 place-self-center">
        <Button className="hover-slide-right-dark">
          Explore <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default FirstAct;
