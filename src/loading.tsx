import { Progress } from '@/components/ui/progress';
import useStore from './store/venueStore';

import { useState, useEffect } from 'react';

const Loading = () => {
  const [progress, setProgress] = useState(15);
  const { loading } = useStore();

  useEffect(() => {
    if (loading) {
      setProgress(66);
    }
  }, [loading]);

  return (
    <Progress
      className="fixed left-0 top-0 z-50 h-1.5 rounded-none bg-transparent"
      value={progress}
    />
  );
};

export default Loading;
