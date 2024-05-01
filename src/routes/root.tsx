import { Outlet } from 'react-router-dom';
import EarthContainer from '@/components/earth/earth-container';
import Loading from '@/components/loading';

const Root = () => {
  return (
    <>
      <div className="fixed left-0 top-0 z-0 h-full w-full overflow-hidden">
        <EarthContainer />
      </div>
      <main className="z-10">
        <Loading />
        <Outlet />
      </main>
    </>
  );
};

export default Root;
