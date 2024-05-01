import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="flex min-h-[100svh] w-full flex-col justify-between px-4 py-16">
      <h1 className=" text-5xl font-semibold text-muted">
        We'll help you{' '}
        <span className="text-foreground">
          find / create{' '}
        </span>
        the perfect venue.
      </h1>

      <Button
        variant="primary"
        size="lg"
        className="btn-hover-slide-right group"
      >
        <span className="z-10 transition group-hover:text-foreground">
          <ArrowRight />
        </span>
      </Button>
    </section>
  );
};

export default Hero;
