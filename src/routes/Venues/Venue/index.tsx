import { useLoaderData } from 'react-router-dom';

const Venue = () => {
  const { data } = useLoaderData();

  console.log(data);
  return (
    <div>
      <h1>Venue Page</h1>
    </div>
  );
};

export default Venue;
