import Navbar from '@/components/navbar/Navbar';
import Loading from '@/loading';

import { Leva } from 'leva';
import { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

const Root = () => {
  const [hash, setHash] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (location.hash === '#debug') {
      setHash(false);
    }
  }, []);

  return (
    <>
      {navigation.state === 'loading' && <Loading />}

      <Navbar />

      <Outlet />

      <Leva hidden={hash} collapsed />
    </>
  );
};

export default Root;
