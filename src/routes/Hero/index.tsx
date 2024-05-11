import { useTimelineStore } from '@/store/timeline';

import FirstAct from '@/components/acts/FirstAct';
import EarthContainer from '@/components/earth/EarthContainer';

import { useEffect } from 'react';

const App = () => {
  const updateAct = useTimelineStore((state) => state.updateAct);
  const currentAct = useTimelineStore((state) => state.currentAct);

  useEffect(() => {
    updateAct(1);
  }, [updateAct]);

  return (
    <>
      {currentAct === 1 && <FirstAct />}

      <EarthContainer />
    </>
  );
};

export default App;
