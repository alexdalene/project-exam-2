import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="flex min-h-[100svh] w-full flex-col justify-between px-4 py-20">
      <h1 className=" text-5xl font-semibold">
        Let's go to EGYPT
      </h1>

      <Button
        variant="outline"
        size="lg"
        className="w-fit content-end self-end rounded-2xl text-xl font-normal"
      >
        Find venues
      </Button>
    </section>
  );
};

export default Hero;
