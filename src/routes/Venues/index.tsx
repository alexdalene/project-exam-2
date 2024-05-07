import { useLoadingStore } from '@/store/loading';
import { useTimelineStore } from '@/store/timeline';

import { useEffect } from 'react';

const Venues = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const updateAct = useTimelineStore((state) => state.updateAct);

  useEffect(() => {
    if (!isLoading) {
      updateAct(2);
    }
  }, [isLoading, updateAct]);

  return (
    <section>
      <h1>Venues</h1>
    </section>
  );
};

export default Venues;
