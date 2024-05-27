/**
 * API functions for fetching data from the backend
 */

const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

const headers = {
  'X-Noroff-API-Key': API_KEY,
};

export const fetchAllVenues = async (page: number = 1) => {
  const response = await fetch(
    `${API_URL}/holidaze/venues?_bookings=true&sort=created&page=${page}`,
    {
      headers,
    },
  );
  if (!response.ok) throw new Error('Failed to fetch venues');
  return response.json();
};

export const fetchSingleVenue = async (id: string) => {
  const response = await fetch(
    `${API_URL}/holidaze/venues/${id}?_owner=true&_bookings=true`,
    { headers },
  );
  if (!response.ok) throw new Error('Failed to fetch venue');
  return response.json();
};

export const searchVenues = async (query: string) => {
  const response = await fetch(`${API_URL}/holidaze/venues/search?q=${query}`, {
    headers,
  });
  if (!response.ok) throw new Error('Failed to search venues');
  return response.json();
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error('Failed to login');
  return response.json();
};

export const signup = async (credentials: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error('Failed to signup');
  return response.json();
};

export const bookVenue = async (
  token: string,
  booking: {
    dateFrom: Date | undefined;
    dateTo: Date | undefined;
    guests: number;
    venueId: string;
  },
) => {
  const response = await fetch(`${API_URL}/holidaze/bookings`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) throw new Error('Failed to book venue');
  return response.json();
};

export const fetchProfile = async (
  token: string | null,
  name: string | undefined,
) => {
  const response = await fetch(
    `${API_URL}/holidaze/profiles/${name}?_bookings=true&_venues=true`,
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

export const updateProfile = async (
  token: string | null,
  name: string | undefined,
  profile: {
    bio: string;
    avatar: { url: string; alt: string };
    banner: { url: string; alt: string };
  },
) => {
  const response = await fetch(`${API_URL}/holidaze/profiles/${name}`, {
    method: 'PUT',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) throw new Error('Failed to update profile');
  return response.json();
};
