import { useSearchParams } from 'react-router-dom';

type FilterState = {
  price: [number, number];
  amenities: string[];
  guests: number | string;
  query: string;
};

export const useFilterState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = <T extends number | string>(
    key: string,
    defaultValue: T,
  ): T => {
    const param = searchParams.get(key);
    return param ? (param as T) : defaultValue;
  };

  const getStringArrayParam = (key: string): string[] => {
    const param = searchParams.get(key);
    return param ? param.split(',') : [];
  };

  const price = [
    getParam<number>('priceMin', 100),
    getParam<number>('priceMax', 5000),
  ] as [number, number];
  const amenities = getStringArrayParam('amenities');
  const guests = getParam<string>('guests', '');
  const query = getParam<string>('q', '');

  const setFilterState = (newState: Partial<FilterState>) => {
    // Get the current state
    const currentState = { price, amenities, guests, query };

    // Merge the current state with the new state
    const updatedState = { ...currentState, ...newState };

    const params = new URLSearchParams();

    // Set the parameters based on the updated state
    if (updatedState.price[0] !== 100 || updatedState.price[1] !== 5000) {
      params.set('priceMin', String(updatedState.price[0]));
      params.set('priceMax', String(updatedState.price[1]));
    }

    if (updatedState.amenities.length > 0) {
      params.set('amenities', updatedState.amenities.join(','));
    }

    if (updatedState.guests !== '') {
      params.set('guests', String(updatedState.guests));
    }

    if (updatedState.query !== '') {
      params.set('q', updatedState.query);
    }

    setSearchParams(params);
  };

  return { price, amenities, guests, query, setFilterState };
};
