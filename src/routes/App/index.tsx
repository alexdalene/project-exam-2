import { useTimelineStore } from '@/store/timeline';
import { useLoadingStore } from '@/store/loading';

import { useEffect } from 'react';

import FirstAct from '@/components/acts/FirstAct';
import SecondAct from '@/components/acts/SecondAct';
import ThirdAct from '@/components/acts/ThirdAct';

const App = () => {
  const updateAct = useTimelineStore((state) => state.updateAct);
  const currentAct = useTimelineStore((state) => state.currentAct);
  const isLoading = useLoadingStore((state) => state.isLoading);

  useEffect(() => {
    if (!isLoading) {
      updateAct(1);
    }
  }, [isLoading, updateAct]);

  return (
    <section className="grid min-h-[inherit] grid-rows-5">
      {currentAct === 1 && <FirstAct />}
      {currentAct === 2 && <SecondAct />}
      {currentAct === 3 && <ThirdAct />}
    </section>
  );
};

export default App;
