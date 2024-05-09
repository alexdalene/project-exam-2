type Venue = {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: VenueLocation;
  owner: VenueUser;
  bookings: VenueBookings[];
  _count: { bookings: number };
};

type VenueLocation = {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
};

type VenueMeta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};

type VenueUser = {
  name: string;
  email: string;
  bio: string;
  avatar: { url: string; alt: string };
  banner: { url: string; alt: string };
};

type VenueBookings = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: VenueUser;
};

export type { Venue };
