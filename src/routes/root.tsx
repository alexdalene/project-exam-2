import Navbar from '@/components/navbar/Navbar';

import { Leva } from 'leva';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
  const [hash, setHash] = useState(true);

  useEffect(() => {
    if (location.hash === '#debug') {
      setHash(false);
    }
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-dvh">
        <Outlet />
      </main>

      <Leva hidden={hash} collapsed />
    </>
  );
};

export default Root;
