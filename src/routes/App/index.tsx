import Hero from '@/components/hero-section';
import { useAnimationStore } from '@/store/animation';

const App = () => {
  const isFinished = useAnimationStore(
    (state) => state.isFinished,
  );

  return <>{!isFinished && <Hero />}</>;
};

export default App;
