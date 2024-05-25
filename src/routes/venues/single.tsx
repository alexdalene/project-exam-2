import useStore from '@/store/venueStore';

import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DatePicker from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Dog,
  Minus,
  ParkingCircle,
  Plus,
  Star,
  Stars,
  User,
  Utensils,
  Wifi,
} from 'lucide-react';
import { useEffect, useState, useRef, useMemo } from 'react';
import { format, differenceInDays } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';

const POPULAR_BOOKING_COUNT = 15;

const VenuesSingle = () => {
  const { venueId } = useParams();
  const {
    fetchSingleVenue,
    venue,
    bookingDateRange,
    user,
    loading,
    bookVenue,
    bookSuccess,
    token,
  } = useStore();
  const [isPopular, setIsPopular] = useState<boolean>(false);
  const [days, setDays] = useState<number>(1);
  const [guests, setGuests] = useState<number>(1);
  const infoPopover = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookingDateRange?.from && bookingDateRange?.to) {
      setDays(differenceInDays(bookingDateRange.to, bookingDateRange.from));
    }
  }, [bookingDateRange]);

  useEffect(() => {
    fetchSingleVenue(venueId);
  }, [fetchSingleVenue, venueId]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (venue) {
      setIsPopular(venue._count.bookings >= POPULAR_BOOKING_COUNT);
    }
  }, [venue]);

  useEffect(() => {
    if (bookSuccess) {
      toast({
        title: 'Booking successful',
        description: `You have successfully placed a booking. Enjoy your stay!`,
        action: (
          <ToastAction
            altText="Manage"
            onClick={() => navigate('/profile/bookings')}
          >
            Manage
          </ToastAction>
        ),
      });

      fetchSingleVenue(venueId);

      return () => {
        useStore.setState({ bookSuccess: false });
      };
    }
  }, [bookSuccess, toast, navigate, fetchSingleVenue, venueId]);

  const handleBookVenue = () => {
    if (venueId && token && bookingDateRange?.from && bookingDateRange?.to) {
      bookVenue(token, {
        dateFrom: bookingDateRange.from,
        dateTo: bookingDateRange.to,
        guests,
        venueId: venueId,
      });
    }
  };

  const amenities = useMemo(
    () => [
      { name: 'Wifi', enabled: venue?.meta.wifi, icon: <Wifi size={20} /> },
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
      { name: 'Pets', enabled: venue?.meta.pets, icon: <Dog size={20} /> },
    ],
    [venue?.meta],
  );

  return (
    <div className="mb-24 mt-14">
      <div className="grid gap-8 md:grid-cols-2 md:gap-16 md:px-8 md:pt-16 lg:px-16">
        <div
          className="fixed bottom-0 left-0 z-50 h-fit w-full border-t border-black/5 bg-popover"
          ref={infoPopover}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 md:px-8 lg:px-16">
            <div>
              {loading ? (
                <>
                  <Skeleton className="mb-1 h-6 w-[100px]" />
                  <Skeleton className="h-6 w-[50px]" />
                </>
              ) : (
                <>
                  <div className="font-medium">
                    {bookingDateRange?.from && bookingDateRange?.to ? (
                      <>
                        {venue && venue.price * days * guests + ' NOK'}{' '}
                        <span className="text-sm font-normal text-muted-foreground">
                          total
                        </span>
                      </>
                    ) : (
                      <>
                        {venue?.price + ' NOK'}{' '}
                        <span className="text-sm font-normal text-muted-foreground">
                          night
                        </span>
                      </>
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-normal">
                      {bookingDateRange?.from && bookingDateRange?.to
                        ? `${format(bookingDateRange?.from ?? new Date(), 'LLL dd')} -
                  ${format(bookingDateRange?.to ?? new Date(), 'LLL dd')}`
                        : 'Pick a date'}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2">
              {user && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setGuests((prev) => prev - 1)}
                    disabled={guests === 1}
                  >
                    <Minus size={16} />
                  </Button>

                  <span className="flex items-center gap-1 font-medium tabular-nums">
                    <User size={20} /> {guests}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setGuests((prev) => prev + 1)}
                    disabled={guests === venue?.maxGuests}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              )}

              {user ? (
                <Button
                  size="lg"
                  className="rounded-xl"
                  onClick={handleBookVenue}
                  disabled={!bookingDateRange?.from || !bookingDateRange?.to}
                >
                  Book
                </Button>
              ) : (
                <Button size="lg" className="rounded-xl" disabled>
                  Login to book
                </Button>
              )}
            </div>
          </div>
        </div>

        <div>
          {loading ? (
            <Skeleton className="h-[414px] w-full" />
          ) : (
            <Carousel>
              <CarouselContent>
                {venue?.media.map((media, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={media.url}
                      alt={media.alt}
                      className="aspect-square h-full w-full object-cover md:rounded-xl"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {venue && venue.media.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col gap-2 px-4">
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="mt-2 h-6 w-[200px]" />
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="mt-2 h-6 w-[50px]" />
            <Separator className="my-8" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-full" />
              <Skeleton className="h-6 w-[100px]" />
            </div>
            <Separator className="my-8" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : (
          <div className="w-full px-4 md:px-0">
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

            <div className="w-fit cursor-pointer">
              <HoverCard>
                <HoverCardTrigger className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-full border border-border">
                    <img
                      src={venue?.owner.avatar.url}
                      alt={venue?.owner.avatar.alt}
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-medium hover:underline">
                      {venue?.owner.name}
                    </h2>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-full">
                      <img
                        src={venue?.owner.avatar.url}
                        alt={venue?.owner.avatar.alt}
                        className="aspect-square h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 pt-1">
                      <h2 className="flex items-center gap-1 text-sm font-medium">
                        <User size={16} /> {venue?.owner.name}
                      </h2>
                      <p className="line-clamp-2 text-sm">
                        {venue?.owner.bio ?? 'No bio available'}
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
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

            <div>
              <h2 className="mb-4 font-medium">Location</h2>

              <ul className="space-y-2">
                <li>
                  <span className="text-sm text-muted-foreground">Address</span>{' '}
                  {venue?.location.address} <br />
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">City</span>{' '}
                  {venue?.location.city} <br />
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">Country</span>{' '}
                  {venue?.location.country}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenuesSingle;
