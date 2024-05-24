type FilterCriteria = {
  price: [number, number];
  amenities: string[];
  guests: number | string;
} | null;

export type { FilterCriteria };
