import { Outlet } from 'react-router-dom';

const Venues = () => {
  return (
    <div className="flex flex-col">
      <div className="mx-auto w-full max-w-[1400px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Venues;
