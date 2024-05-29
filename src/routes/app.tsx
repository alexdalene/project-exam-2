import EarthContainer from '@/components/earth/EarthContainer';
import { Button } from '@/components/ui/button';

import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="
          Holidaze is a platform that allows you to easily create and manage your own venues. We have created a system that is simple, easy to use, and secure. Our platform is designed to be accessible to everyone, and we take security very seriously.
        "
        />
        <title>Holidaze</title>
      </Helmet>

      <main>
        <section className="mx-auto grid min-h-dvh max-w-[1400px] p-4 md:p-8">
          <div className="flex justify-between">
            <div className="flex flex-col-reverse">
              <h1 className="text-4xl font-medium uppercase md:text-6xl">
                Holidaze
              </h1>
              <p className="mb-2 max-w-[24ch] text-balance text-base text-muted-foreground md:mb-4 md:text-lg">
                Venues from around the world, all in one place.
              </p>
            </div>
            <div className="z-10 flex flex-col-reverse">
              <Link to="/venues">
                <Button>
                  Get Started <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <EarthContainer />
    </>
  );
};

export default App;
