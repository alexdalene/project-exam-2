import { useState, useEffect } from 'react';
import type { Venue } from '@/types/venue';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const VenueItem = (venue: Venue) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = venue.media[0]?.url;
    img.alt = venue.media[0]?.alt;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsError(true);
  }, [venue]);

  if (isError) {
    return null;
  }

  return (
    <>
      {isLoading ? (
        <div className="flex h-fit w-full flex-col bg-background px-3 py-2">
          <Skeleton className="aspect-square h-full w-full object-cover" />
          <div>
            <Skeleton className="mb-1 mt-4 h-[24px] w-[250px]" />
            <Skeleton className="mb-2 h-[20px] w-[150px]" />
            <Skeleton className="mt-4 h-[20px] w-[100px]" />
          </div>
        </div>
      ) : (
        <Link to={`./${venue.id}`}>
          <article className="h-fit w-full overflow-hidden rounded-md bg-background px-3 pb-8 pt-2 focus:bg-accent md:hover:bg-accent">
            <img
              src={venue.media[0]?.url}
              alt={venue.media[0]?.alt}
              className="aspect-square h-full w-full rounded-md object-cover"
              loading="lazy"
            />
            <header className="mt-2 flex h-full w-full items-start justify-between overflow-hidden px-2 md:px-0">
              <div className="w-full">
                <h2 className="mb-1 line-clamp-2 text-sm font-medium">
                  {venue.location.city + ', ' + venue.location.country}
                </h2>
                <p className="truncate text-sm"></p>
              </div>
              {venue.rating !== 0 && (
                <div className="flex items-center gap-1">
                  <Star
                    size={20}
                    strokeWidth={0}
                    fill="#292524"
                    className="text-foreground"
                  />
                  <span className="text-sm font-medium">
                    {Math.round(venue.rating) + ',0'}
                  </span>
                </div>
              )}
            </header>
            <footer className="mt-4 px-2 text-sm font-medium md:px-0">
              {venue.price} NOK per night
            </footer>
          </article>
        </Link>
      )}
    </>
  );
};

export default VenueItem;
