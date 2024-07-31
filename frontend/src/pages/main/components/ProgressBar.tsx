import { useEffect, useState } from 'react';
import { SummaryInfo } from '@/types/type';
import theme from '@/styles/theme';

const ProgressBar = ({ info }: { info: SummaryInfo }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const targetProgress = (info.dietTotalCalories / info.targetCalories) * 100;
    setProgress(targetProgress);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= targetProgress) {
          clearInterval(interval);
          return targetProgress;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [info]);

  const radius = 130;
  const circumference = Math.PI * radius;
  const offset = (progress / 100) * circumference;

  return (
    <svg width="300" height="150">
      <circle
        stroke={theme['lightgrey']}
        fill="transparent"
        strokeWidth="30"
        r={radius}
        cx="50%"
        cy="100%"
      />
      <circle
        stroke={theme['darkpink']}
        fill="transparent"
        strokeWidth="30"
        r={radius}
        cx="50%"
        cy="100%"
        strokeDasharray={circumference * 2}
        strokeDashoffset={circumference - offset}
        style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
      />
    </svg>
  );
};

export default ProgressBar;
