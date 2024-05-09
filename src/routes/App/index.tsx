import { useTimelineStore } from '@/store/timeline';
import { useLoadingStore } from '@/store/loading';

import { useEffect, useState } from 'react';

import FirstAct from '@/components/acts/FirstAct';
import SecondAct from '@/components/acts/SecondAct';
import ThirdAct from '@/components/acts/ThirdAct';
import Loading from '@/components/Loading';

import EarthContainer from '@/components/earth/EarthContainer';
import { Leva } from 'leva';

const App = () => {
  const [hash, setHash] = useState(true);
  const updateAct = useTimelineStore((state) => state.updateAct);
  const currentAct = useTimelineStore((state) => state.currentAct);
  const isLoading = useLoadingStore((state) => state.isLoading);

  useEffect(() => {
    if (location.hash === '#debug') {
      setHash(false);
    }
    updateAct(1);
  }, [updateAct]);

  return (
    <>
      {isLoading && <Loading />}

      <section className="grid min-h-[inherit] grid-rows-5">
        {currentAct === 1 && <FirstAct />}
        {currentAct === 2 && <SecondAct />}
        {currentAct === 3 && <ThirdAct />}
      </section>

      <Leva hidden={hash} />

      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        <EarthContainer />
      </div>
    </>
  );
};

export default App;
