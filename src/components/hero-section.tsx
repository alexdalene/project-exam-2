import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="flex min-h-[100svh] w-full flex-col justify-between px-4 py-20">
      <h1 className=" text-5xl font-semibold text-muted">
        Let's help you{' '}
        <span className="text-foreground">
          find / create{' '}
        </span>
        the perfect venue.
      </h1>

      <div className="flex justify-end gap-2">
        <Button
          variant="primaryOutline"
          size="lg"
          className="btn-hover-slide-left group"
        >
          <span className="z-10 transition group-hover:text-background">
            Create a venue
          </span>
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="btn-hover-slide-right group"
        >
          <span className="z-10 transition group-hover:text-background">
            Find venues
          </span>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
