import { useAnimationStore } from '@/store/animation';
import { useLoadingStore } from '@/store/loading';

import Loading from '@/components/loading';
import Hero from '@/components/hero-section';
import Menu from '@/components/menu';

const App = () => {
  const isFinished = useAnimationStore((state) => state.isFinished);
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <>
      {isLoading && <Loading />}
      {!isFinished && <Hero />}
      {isFinished && <Menu />}
    </>
  );
};

export default App;
