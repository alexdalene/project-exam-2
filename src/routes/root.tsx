import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import Loading from '@/loading';
import { Toaster } from '@/components/ui/toaster';

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

      <Toaster />

      <Footer />

      <Leva hidden={hash} collapsed />
    </>
  );
};

export default Root;
