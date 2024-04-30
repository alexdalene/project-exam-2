import { Outlet } from 'react-router-dom';
import EarthContainer from '@/components/earth/earth-container';

const Root = () => {
  return (
    <>
      <div className="fixed left-0 top-0 z-0 h-full w-full overflow-hidden">
        <EarthContainer />
      </div>
      <main className="z-10">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
