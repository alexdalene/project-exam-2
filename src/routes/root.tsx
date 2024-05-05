import EarthContainer from '@/components/earth/earth-container';
import Loading from '@/components/loading';

import { useLoadingStore } from '@/store/loading';

import { Outlet } from 'react-router-dom';
import { Leva } from 'leva';
import { useState, useEffect } from 'react';

const Root = () => {
  const [hash, setHash] = useState(true);

  const isLoading = useLoadingStore((state) => state.isLoading);

  useEffect(() => {
    if (window.location.hash === '#debug') {
      setHash(false);
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}

      <Leva hidden={hash} />

      <main className="min-h-dvh">
        <Outlet />
      </main>

      <div className="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden">
        <EarthContainer />
      </div>
    </>
  );
};

export default Root;
