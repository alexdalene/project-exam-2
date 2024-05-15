const getAllVenues = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';

    const response = await fetch(
      `${import.meta.env.VITE_API_URL as string}/venues?page=${page}`,
      {
        headers: {
          'X-Noroff-API-Key': import.meta.env.VITE_API_KEY as string,
        },
      },
    );

    const data = await response.json();

    return { venues: data.data, meta: data.meta };
  } catch (error) {
    console.error(error);
  }
};

const getSingleVenue = async (venueId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL as string}/venues/${venueId}`,
      {
        headers: {
          'X-Noroff-API-Key': import.meta.env.VITE_API_KEY as string,
        },
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const FilterVenues = ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const params = url.searchParams;

  const price = params.get('price');
  const amenities = params.get('amenities');
  const guests = params.get('guests');

  return { filters: { price, amenities, guests } };
};

// eslint-disable-next-line react-refresh/only-export-components
export { getAllVenues, getSingleVenue, FilterVenues };
