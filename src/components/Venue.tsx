import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import type { VenueType } from '@/types/venue';
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, parseISO, compareAsc, isAfter } from 'date-fns';

const Venue = ({ id, media, location, rating, price, bookings }: VenueType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [earliestBooking, setEarliestBooking] = useState<string | null>(null);
  const [isPopular, setIsPopular] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = media[0]?.url;
    img.alt = media[0]?.alt;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsError(true);

    if (bookings && bookings.length > 0) {
      const now = new Date();
      const futureBookings = bookings
        .map((booking) => parseISO(booking.dateFrom))
        .filter((date) => isAfter(date, now))
        .sort(compareAsc);

      if (futureBookings.length > 0) {
        setEarliestBooking(format(futureBookings[0], 'MMM do'));
      }
    } else {
      const now = new Date();
      setEarliestBooking(format(now, 'MMM do'));
    }

    if (bookings && bookings.length >= 15) {
      setIsPopular(true);
    }
  }, [media, bookings]);

  if (isError) {
    return null;
  }

  return (
    <>
      {isLoading ? (
        <div className="flex h-fit w-full flex-col bg-background">
          <Skeleton className="aspect-square h-full w-full object-cover" />
          <div className="mt-2 flex gap-4">
            <Skeleton className="h-[20px] w-full max-w-full" />
            <Skeleton className="h-[20px] w-full min-w-[50px] max-w-full flex-1" />
          </div>
          <Skeleton className="mt-2 h-[20px] w-[100px]" />
          <Skeleton className="mt-4 h-[20px] w-[150px]" />
        </div>
      ) : (
        <Link
          to={`./${id}`}
          className="focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-4"
          aria-label={`View details for ${location.city}, ${location.country}`}
        >
          <article className="relative h-fit w-full overflow-hidden rounded-md bg-background">
            <img
              src={media[0]?.url}
              alt={media[0]?.alt}
              className="aspect-square h-full w-full rounded-md object-cover"
              loading="lazy"
            />
            {isPopular && (
              <Badge
                variant="secondary"
                className="absolute left-3 top-3 shadow-md"
              >
                Popular
              </Badge>
            )}
            <header className="mt-2 flex h-full w-full items-start justify-between overflow-hidden px-2 text-base sm:text-sm md:px-0">
              <div className="w-full">
                <h2 className="mb-1 line-clamp-2 font-medium">
                  {location.city + ', ' + location.country}
                </h2>
                {earliestBooking && (
                  <p className="truncate  text-muted-foreground">
                    {earliestBooking}
                  </p>
                )}
              </div>
              {rating !== 0 && (
                <div className="flex items-center gap-1">
                  <Star
                    size={20}
                    strokeWidth={0}
                    fill="#292524"
                    className="text-foreground"
                  />
                  <span className=" font-medium">
                    {Math.round(rating) + ',0'}
                  </span>
                </div>
              )}
            </header>
            <footer className="mt-4 px-2 text-base font-medium sm:text-sm md:px-0">
              {price} NOK per night
            </footer>
          </article>
        </Link>
      )}
    </>
  );
};

export default Venue;
