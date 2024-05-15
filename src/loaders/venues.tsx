const getAllVenues = async (request: Request) => {
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

export { getAllVenues, getSingleVenue };
