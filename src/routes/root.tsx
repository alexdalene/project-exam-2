import EarthContainer from '@/components/earth/earth-container';
// import Navbar from '@/components/navbar';

// import { useAnimationStore } from '@/store/animation';

import { Outlet } from 'react-router-dom';
import { Leva } from 'leva';
import { useState, useEffect } from 'react';

const Root = () => {
  const [hash, setHash] = useState(true);
  // const isFinished = useAnimationStore((state) => state.isFinished);

  useEffect(() => {
    if (window.location.hash === '#debug') {
      setHash(false);
    }
  }, []);

  return (
    <>
      <Leva hidden={hash} />

      {/* {isFinished && <Navbar />} */}

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
