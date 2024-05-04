// import { useAnimationStore } from '@/store/animation';
import { useLoadingStore } from '@/store/loading';
import { useTimelineStore } from '@/store/timeline';

import Loading from '@/components/loading';

import FirstAct from '@/components/acts/FirstAct';
import SecondAct from '@/components/acts/SecondAct';
import ThirdAct from '@/components/acts/ThirdAct';

const App = () => {
  // const isFinished = useAnimationStore((state) => state.isFinished);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const currentAct = useTimelineStore((state) => state.currentAct);

  return (
    <>
      {isLoading && <Loading />}
      {/* {!isFinished && <Hero />} */}
      {/* {isFinished && <Menu />} */}

      {currentAct === 1 && <FirstAct />}
      {currentAct === 2 && <SecondAct />}
      {currentAct === 3 && <ThirdAct />}
    </>
  );
};

export default App;
