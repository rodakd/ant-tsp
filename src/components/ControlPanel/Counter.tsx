import { cost } from '~/helpers';
import { useStore } from '~/store';

export const Counter = () => {
  const iteration = useStore((state) => state.iteration);
  const bestTour = useStore((state) => cost(state.bestTour));

  return (
    <div className='counter'>
      <span className='counter__iteration'>Iteration: {iteration}</span>
      <span className='counter__best-tour'>{bestTour} km</span>
    </div>
  );
};
