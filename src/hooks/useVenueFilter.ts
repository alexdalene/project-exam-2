import { useFilterState } from './useFilterState';
import useStore from '@/store/venueStore';

export const useVenueFilter = () => {
  const { page, setFilterState } = useFilterState();
  const { fetchAllVenues } = useStore();

  const filterCriteria = {
    price: [100, 5000] as [number, number],
    amenities: [],
    guests: '',
  };

  const resetFiltersAndFetchVenues = async () => {
    setFilterState(filterCriteria);
    fetchAllVenues(page, filterCriteria);
  };

  return { resetFiltersAndFetchVenues };
};
