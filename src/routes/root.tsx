import EarthContainer from '@/components/earth/EarthContainer';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';

import { useLoadingStore } from '@/store/loading';
import { useTimelineStore } from '@/store/timeline';

import { Outlet } from 'react-router-dom';
import { Leva } from 'leva';
import { useState, useEffect } from 'react';

const Root = () => {
  const [hash, setHash] = useState(true);

  const isLoading = useLoadingStore((state) => state.isLoading);
  const currentAct = useTimelineStore((state) => state.currentAct);

  useEffect(() => {
    if (location.hash === '#debug') {
      setHash(false);
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {currentAct !== 1 && <Navbar />}

      <Leva hidden={hash} />

      <main className="min-h-dvh">
        <Outlet />
      </main>

      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <EarthContainer />
      </div>
    </>
  );
};

export default Root;
