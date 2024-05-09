import { useState, useEffect } from 'react';
import type { Venue } from '@/types/venue';
import { Circle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const VenueGrid = (venue: Venue) => {
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
        <div className="flex h-fit w-full flex-col bg-background">
          <Skeleton className="aspect-square h-full w-full object-cover" />
          <div className="px-4 md:px-0">
            <Skeleton className="mb-1 mt-4 h-[24px] w-[250px]" />
            <Skeleton className="mb-2 h-[20px] w-[150px]" />
            <Skeleton className="h-[20px] w-[70px]" />
            <Skeleton className="mt-4 h-[20px] w-[100px]" />
          </div>
        </div>
      ) : (
        <Link to={`/venues/${venue.id}`}>
          <article className="h-fit w-full bg-background">
            <img
              src={venue.media[0]?.url}
              alt={venue.media[0]?.alt}
              className="aspect-square h-full w-full object-cover"
              loading="lazy"
            />

            <header className="mt-4 h-full px-4 md:px-0">
              <h2 className="mb-1 truncate text-xl font-medium">
                {venue.name}
              </h2>
              <p className="mb-2 truncate text-sm">
                {venue.location.city + ', ' + venue.location.country}
              </p>
              <div className="flex items-center gap-2">
                <Star
                  strokeWidth={0}
                  fill="#292524"
                  className="text-foreground"
                />
                <span className="text-sm font-medium">
                  {Math.round(venue.rating) + ',0'}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-muted">
                {venue.maxGuests} guests
                <Circle strokeWidth={0} fill="#A8A29E" size={4} />
                {venue._count.bookings} bookings
              </div>
            </header>
          </article>
        </Link>
      )}
    </>
  );
};

export default VenueGrid;
