import Navbar from '@/components/navbar/Navbar';
import Loading from '@/loading';

import { Leva } from 'leva';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useStore from '@/store/venueStore';

const Root = () => {
  const [hash, setHash] = useState(true);
  const { loading } = useStore();

  useEffect(() => {
    if (location.hash === '#debug') {
      setHash(false);
    }
  }, []);

  return (
    <>
      {loading && <Loading />}

      <Navbar />

      <Outlet />

      <Leva hidden={hash} collapsed />
    </>
  );
};

export default Root;
