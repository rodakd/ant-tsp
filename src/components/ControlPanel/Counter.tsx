import { cost } from '~/helpers';
import { useStore } from '~/store';
import { SpeedSlider } from './SpeedSlider';

export const Counter = () => {
  const iteration = useStore((state) => state.iteration);
  const bestTour = useStore((state) => cost(state.bestTour));

  return (
    <div className='counter'>
      <div className='counter__inner'>
        <span className='counter__iteration'>Iteration: {iteration}</span>
        <span className='counter__best-tour'>{bestTour.toFixed(2)} km</span>
      </div>
      <SpeedSlider />
    </div>
  );
};
