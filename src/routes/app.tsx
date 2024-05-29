import EarthContainer from '@/components/earth/EarthContainer';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';
import { Helmet } from 'react-helmet';

const App = () => {
  const firstActRef = useRef(null!);
  const secondActRef = useRef(null!);

  const masterRef = useRef<gsap.core.Timeline>();
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (!masterRef.current) {
      masterRef.current = gsap.timeline();
    }

    const tl = masterRef.current;

    tl.to(firstActRef.current, {
      scrollTrigger: {
        trigger: firstActRef.current,
        start: 'top top',
        end: '+=50%',
        scrub: true,
        pin: true,
        anticipatePin: 1,
        pinSpacing: false,
      },
      opacity: 0,
      translateY: 100,
    });

    tl.to(secondActRef.current, {
      scrollTrigger: {
        trigger: secondActRef.current,
        start: 'top 60%',
        end: '+=50%',
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.from('.section', {
      scrollTrigger: {
        trigger: secondActRef.current,
        start: 'top 60%',
        end: '+=40%',
        scrub: true,
      },
      opacity: 0,
      translateY: 100,
      stagger: 0.2,
    });
  });

  const sections: { title: string; description: string }[] = [
    {
      title: 'Innovative',
      description:
        'Our platform is designed to be simple and easy to use. We have created a system that allows you to easily create and manage your own venues.',
    },
    {
      title: 'Accessible',
      description:
        'Our most important goal is to make our platform accessible to everyone. We have created a system that is easy to use and understand.',
    },
    {
      title: 'Secure',
      description:
        'We take security very seriously. We have implemented a number of security features to ensure that your data is safe and secure.',
    },
  ];

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
        <section
          ref={firstActRef}
          className="mx-auto grid min-h-dvh max-w-[1400px] p-8"
        >
          <div className="flex justify-between">
            <div className="flex flex-col-reverse">
              <h1 className="text-5xl font-medium uppercase md:text-6xl">
                Holidaze
              </h1>
              <p className="mb-4 max-w-[24ch] text-balance text-lg text-muted-foreground">
                Venues from around the world, all in one place.
              </p>
            </div>
            <div className="flex flex-col-reverse">
              <ArrowDown size={40} strokeWidth={1} />
            </div>
          </div>
        </section>

        <section
          ref={secondActRef}
          className="mx-auto grid min-h-dvh max-w-[1400px] px-8"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {sections.map((section, index) => (
              <div
                key={index}
                className="section flex h-fit flex-col px-4 py-3"
              >
                <h1 className="mb-4 text-xl font-medium uppercase">
                  {section.title}
                </h1>
                <p className="max-w-[40ch] text-pretty text-muted-foreground">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <EarthContainer />
    </>
  );
};

export default App;
