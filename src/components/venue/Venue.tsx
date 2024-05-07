import { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface VenueProps {
  media: {
    url: string;
    alt: string;
  }[];
}

const Venue = ({ media }: VenueProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const venueRef = useRef<HTMLDivElement>(null!);
  const imgRef = useRef<HTMLImageElement>(null!);

  useEffect(() => {
    const img = new Image();
    img.src = media[0]?.url;
    img.alt = media[0]?.alt;
    img.onload = () => setIsLoading(false);
  }, [media]);

  // useGSAP(
  //   () => {
  //     gsap.registerPlugin(ScrollTrigger);

  //     gsap.to(venueRef.current, {
  //       scrollTrigger: {
  //         trigger: venueRef.current,
  //         start: 'top 60%',
  //         end: 'bottom 40%',
  //         scrub: 1,
  //       },
  //       scale: 0.8,
  //     });
  //   },
  //   { scope: venueRef.current, dependencies: [isLoading] },
  // );

  return (
    <div className="max-h-full max-w-full" ref={venueRef}>
      {isLoading && <Skeleton className="aspect-square h-full w-full" />}
      {!isLoading && (
        <img
          ref={imgRef}
          src={media[0]?.url}
          alt={media[0]?.alt}
          className="aspect-square h-full w-full rounded-lg object-cover"
        />
      )}
    </div>
  );
};

export default Venue;
