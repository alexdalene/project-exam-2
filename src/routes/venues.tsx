import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Venues = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="
          Holidaze is a hotel booking website that allows you to book hotels, 
          motels, and other types of accommodations. Book your next stay with 
          Holidaze and enjoy a relaxing vacation."
        />
        <title>Holidaze | Venues</title>
      </Helmet>

      <div className="flex flex-col">
        <div className="mx-auto w-full max-w-[1400px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Venues;
