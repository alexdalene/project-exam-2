import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import type { Venue } from '@/types/venue';
import { Circle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const VenueGrid = (venue: Venue) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = venue.media[0]?.url;
    img.alt = venue.media[0]?.alt;
    img.onload = () => setIsLoading(false);
  }, [venue]);

  return (
    <Link to={`/venues/${venue.id}`}>
      <article className="h-fit w-full bg-background">
        {isLoading ? (
          <Skeleton height={282} />
        ) : (
          <img
            src={venue.media[0]?.url}
            alt={venue.media[0]?.alt}
            className="aspect-square h-full w-full object-cover"
            loading="lazy"
          />
        )}

        <header className="mt-4 h-full px-4 md:px-0">
          <h2 className="mb-1 truncate text-xl font-medium">{venue.name}</h2>
          <p className="mb-2 truncate text-sm">
            {venue.location.city + ', ' + venue.location.country}
          </p>
          <div className="flex items-center gap-2">
            <Star strokeWidth={0} fill="#292524" className="text-foreground" />
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
  );
};

export default VenueGrid;
