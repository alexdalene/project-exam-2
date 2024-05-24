import { VenueType } from '@/types/venue';
import { FilterCriteria } from '@/types/filter';

export const filterVenues = (
  venues: VenueType[],
  filterCriteria: FilterCriteria,
): VenueType[] => {
  return venues.filter((venue) => {
    if (!filterCriteria) return true;

    const matchesPrice = (): boolean => {
      return (
        (filterCriteria.price[0] === 100 && filterCriteria.price[1] === 5000) ||
        (venue.price >= filterCriteria.price[0] &&
          venue.price <= filterCriteria.price[1])
      );
    };

    const matchesAmenities = (): boolean => {
      return (
        filterCriteria.amenities.length === 0 ||
        filterCriteria.amenities.every((amenity) => venue.meta[amenity])
      );
    };

    const matchesGuests = (): boolean => {
      return (
        filterCriteria.guests === '' ||
        venue.maxGuests <= Number(filterCriteria.guests)
      );
    };

    return matchesPrice() && matchesAmenities() && matchesGuests();
  });
};
