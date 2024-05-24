import { useSearchParams } from 'react-router-dom';

type FilterState = {
  price: [number, number];
  amenities: string[];
  guests: number | string;
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

  const setFilterState = ({ price, amenities, guests }: FilterState) => {
    const params = new URLSearchParams();

    if (price[0] !== 100 || price[1] !== 5000) {
      params.set('priceMin', price[0].toString());
      params.set('priceMax', price[1].toString());
    }

    if (amenities.length) {
      params.set('amenities', amenities.join(','));
    }

    if (guests !== '') {
      params.set('guests', guests.toString());
    }

    setSearchParams(params);
  };

  return { price, amenities, guests, setFilterState };
};
