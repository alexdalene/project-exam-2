type VenueType = {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMetaType;
  location: VenueLocationType;
  owner: VenueUserType;
  bookings: VenueBookingsType[];
  _count: { bookings: number };
};

type VenueLocationType = {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
};

type VenueMetaType = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
  [key: string]: boolean;
};

type VenueUserType = {
  name: string;
  email: string;
  bio: string;
  avatar: { url: string; alt: string };
  banner: { url: string; alt: string };
  bookings: VenueBookingsType[] | null;
  venues: VenueType[] | null;
  _count: { bookings: number; venues: number };
};

type VenueBookingsType = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: VenueUserType;
};

export type { VenueType, VenueUserType };
