import { useStore } from '~/store';
import { Chart } from './Chart';

export const CurrentRunChart = () => {
  const bestToursHistory = useStore((state) => state.bestToursHistory);
  const performanceMode = useStore((state) => state.performanceMode);
  const status = useStore((state) => state.status);
  const hideChart = useStore((state) => state.hideChart);

  if ((performanceMode && status === 'running') || bestToursHistory.length === 0 || hideChart) {
    return null;
  }

  return <Chart bestToursHistory={bestToursHistory} />;
};
