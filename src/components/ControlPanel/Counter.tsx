import { cost } from '~/helpers';
import { useStore } from '~/store';
import { SpeedSlider } from './SpeedSlider';

export const Counter = () => {
  const iteration = useStore((state) => state.iteration);
  const bestCost = useStore((state) => cost(state.bestTour));
  const performanceMode = useStore((state) => state.performanceMode);

  if (!bestCost) {
    return null;
  }

  return (
    <div className='counter'>
      <div className='counter__inner'>
        <span className='counter__iteration'>Iterations: {iteration}</span>
        <span className='counter__best-tour'>{bestCost.toFixed(2)} km</span>
      </div>
      {!performanceMode && <SpeedSlider />}
    </div>
  );
};
