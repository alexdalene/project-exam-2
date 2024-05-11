import { useLoadingStore } from '@/store/loading';

import Navbar from '@/components/navbar/Navbar';
import LoadingPage from '@/LoadingPage';

import { Leva } from 'leva';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
  const [hash, setHash] = useState(true);
  const isLoading = useLoadingStore((state) => state.isLoading);

  useEffect(() => {
    if (location.hash === '#debug') {
      setHash(false);
    }
  }, []);

  return (
    <>
      {isLoading && <LoadingPage />}

      <Navbar />

      <main className="min-h-dvh overflow-hidden">
        <Outlet />
      </main>

      <Leva hidden={hash} collapsed />
    </>
  );
};

export default Root;
