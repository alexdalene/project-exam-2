type FormVenue = {
  name: string;
  description: string;
  price: number | '' | undefined;
  maxGuests: number | '' | undefined;
  media: { url: string; alt?: string | undefined }[];
  meta: { [key: string]: boolean };
  location: {
    country: string;
    city: string;
    address: string;
    zip: string;
  };
};

export type { FormVenue };
