import { useLoaderData } from 'react-router-dom';

const VenuesSingle = () => {
  const { data } = useLoaderData();

  console.log(data);
  return (
    <div>
      <h1>VenuesSingle Page</h1>
    </div>
  );
};

export default VenuesSingle;
