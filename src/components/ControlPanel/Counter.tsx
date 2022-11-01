import { cost } from '~/helpers';
import { useStore } from '~/store';
import { SpeedSlider } from './SpeedSlider';

export const Counter = () => {
  const iteration = useStore((state) => state.iteration);
  const bestCost = useStore((state) => cost(state.bestTour));
  const performanceMode = useStore((state) => state.performanceMode);
  const multiRunMode = useStore((state) => state.multiRunMode);
  const currentRun = useStore((state) => state.currentRun);
  const iterationsLimitMode = useStore((state) => state.iterationsLimitMode);
  const iterationsLimit = useStore((state) => state.iterationsLimit);

  return (
    <div className='counter'>
      <div className='counter__inner'>
        <span className='counter__iteration'>
          {multiRunMode && `Run: ${currentRun}, `}
          Iterations: {iteration}
          {iterationsLimitMode && `/${iterationsLimit}`}
        </span>
        <span className='counter__best-tour'>{bestCost?.toFixed(2) || 0} km</span>
      </div>
      {!performanceMode && <SpeedSlider />}
    </div>
  );
};
