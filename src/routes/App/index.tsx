import Hero from '@/components/hero-section';
import Menu from '@/components/menu';
import { useAnimationStore } from '@/store/animation';

const App = () => {
  const isFinished = useAnimationStore(
    (state) => state.isFinished,
  );

  return (
    <>
      {!isFinished && <Hero />}
      {isFinished && <Menu />}
    </>
  );
};

export default App;
