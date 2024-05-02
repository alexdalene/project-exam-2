import { Outlet } from 'react-router-dom';
import EarthContainer from '@/components/earth/earth-container';
import Loading from '@/components/loading';
import { useLoadingStore } from '@/store/loading';

const Root = () => {
  const isLoading = useLoadingStore(
    (state) => state.isLoading,
  );

  return (
    <>
      <div className="fixed left-0 top-0 z-0 h-full w-full overflow-hidden">
        <EarthContainer />
      </div>
      <main className="z-10">
        {isLoading && <Loading />}
        <Outlet />
      </main>
    </>
  );
};

export default Root;
