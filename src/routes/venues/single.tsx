import useStore from '@/store/venueStore';

import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DatePicker from '@/components/DatePicker';
import { Button } from '@/components/ui/button';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Dog, ParkingCircle, Star, Stars, Utensils, Wifi } from 'lucide-react';
import { format } from 'date-fns';

const VenuesSingle = () => {
  const { venueId } = useParams();
  const { fetchSingleVenue, venue, bookingDateRange } = useStore();
  const [isPopular, setIsPopular] = useState<boolean>(false);

  useEffect(() => {
    fetchSingleVenue(venueId);
  }, [fetchSingleVenue, venueId]);

  // Create an array of amenities to loop through
  const amenities = [
    {
      name: 'Wifi',
      enabled: venue?.meta.wifi,
      icon: <Wifi size={20} />,
    },
    {
      name: 'Parking',
      enabled: venue?.meta.parking,
      icon: <ParkingCircle size={20} />,
    },
    {
      name: 'Breakfast',
      enabled: venue?.meta.breakfast,
      icon: <Utensils size={20} />,
    },
    {
      name: 'Pets',
      enabled: venue?.meta.pets,
      icon: <Dog size={20} />,
    },
  ];

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Check if venue is popular
    if (venue?._count.bookings && venue?._count.bookings >= 15) {
      setIsPopular(true);
    }
  }, [venue]);

  return (
    <div className="mt-14">
      <div className="fixed bottom-0 left-0 w-full border-t border-black/5 bg-popover">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <div className="font-medium">
              {venue?.price} NOK{' '}
              <span className="text-sm font-normal text-muted-foreground">
                night
              </span>
            </div>
            <div>
              <span className="text-sm font-normal">
                {bookingDateRange?.from && bookingDateRange?.to
                  ? `${format(bookingDateRange?.from ?? new Date(), 'LLL dd')} -
                  ${format(bookingDateRange?.to ?? new Date(), 'LLL dd')}`
                  : 'No dates selected'}
              </span>
            </div>
          </div>
          <Button size="lg" className="rounded-xl">
            Book
          </Button>
        </div>
      </div>

      <div>
        <img
          src={venue?.media[0].url}
          alt={venue?.media[0].alt}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="mt-8 px-4">
        <h1 className="mb-1 text-2xl font-medium">{venue?.name}</h1>

        <div className="mt-4">
          <p className="mb-1 font-medium">
            {venue?.location.city + ', ' + venue?.location.country}
          </p>
          <span className="text-sm text-muted-foreground">
            {venue?.maxGuests} guests
          </span>
        </div>

        {venue?.rating !== 0 && (
          <div className="mt-3 flex items-center gap-1">
            <Star
              size={20}
              strokeWidth={0}
              fill="#292524"
              className="text-foreground"
            />
            <span className="font-medium">
              {Math.round(venue?.rating ?? 0) + ',0'}
            </span>
          </div>
        )}

        {isPopular && (
          <Alert className="mt-8">
            <Stars size={20} />
            <AlertTitle>Popular</AlertTitle>
            <AlertDescription>
              This venue is very popular, book now to secure your stay!
            </AlertDescription>
          </Alert>
        )}

        <Separator className="my-8" />

        <div className="flex items-center gap-4">
          <div className="h-14 w-14 overflow-hidden rounded-full">
            <img
              src={venue?.owner.avatar.url}
              alt={venue?.owner.avatar.alt}
              className="aspect-square h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-medium">{venue?.owner.name}</h2>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="max-w-full">
          <p className="text-pretty">{venue?.description}</p>
        </div>

        <Separator className="my-8" />

        <div>
          <h2 className="mb-4 font-medium">Included in your stay</h2>
          <div className="flex justify-stretch gap-4">
            {amenities.map((amenity, index) => {
              if (amenity.enabled) {
                return (
                  <div
                    key={index}
                    className="flex w-full flex-col items-center gap-3 rounded-xl border border-border px-3 py-2"
                  >
                    {amenity.icon}
                    <span>{amenity.name}</span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="flex w-full flex-col items-center gap-3 rounded-xl border border-border px-3 py-2 text-muted-foreground/50"
                  >
                    {amenity.icon}
                    <span className="line-through">{amenity.name}</span>
                  </div>
                );
              }
            })}
          </div>
        </div>

        <Separator className="my-8" />

        <h3 className="mb-4 font-medium">Pick a date</h3>
        <DatePicker />

        <Separator className="my-8" />
      </div>
    </div>
  );
};

export default VenuesSingle;
