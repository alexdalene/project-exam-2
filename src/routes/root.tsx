import EarthContainer from '@/components/earth/earth-container';
import Loading from '@/components/loading';
import Navbar from '@/components/navbar';

import { useLoadingStore } from '@/store/loading';
import { useAnimationStore } from '@/store/animation';

import { Outlet } from 'react-router-dom';

const Root = () => {
  const isLoading = useLoadingStore(
    (state) => state.isLoading,
  );

  const isFinished = useAnimationStore(
    (state) => state.isFinished,
  );

  return (
    <>
      <div className="fixed left-0 top-0 z-0 h-full w-full overflow-hidden">
        <EarthContainer />
      </div>

      {isFinished && <Navbar />}

      <main className="z-10">
        {isLoading && <Loading />}
        <Outlet />
      </main>
    </>
  );
};

export default Root;
