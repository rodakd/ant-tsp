import { useAppState } from '../AppContext';

export const Counter = () => {
  const { iteration, bestTour } = useAppState();

  return (
    <div className='counter'>
      <span className='counter__iteration'>Iteration: {iteration}</span>
      <span className='counter__best-tour'>{bestTour} km</span>
    </div>
  );
};
