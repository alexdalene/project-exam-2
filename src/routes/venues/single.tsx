import { useLoaderData } from 'react-router-dom';
import type { VenueType } from '@/types/venue';

const VenuesSingle = () => {
  const { data } = useLoaderData() as { data: VenueType };

  console.log(data);
  return (
    <div>
      <h1>VenuesSingle Page</h1>
    </div>
  );
};

export default VenuesSingle;
