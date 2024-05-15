import { Progress } from '@/components/ui/progress';

import { useState, useEffect } from 'react';
import { useNavigation } from 'react-router-dom';

const Loading = () => {
  const [progress, setProgress] = useState(15);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') {
      setProgress(66);
    }

    if (navigation.state === 'idle') {
      setProgress(100);
    }
  }, [navigation.state]);

  return (
    <Progress
      className="fixed left-0 top-0 z-50 h-1 rounded-none bg-transparent"
      value={progress}
    />
  );
};

export default Loading;
