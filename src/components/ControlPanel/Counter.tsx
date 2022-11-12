import { useStore } from '~/store';
import { SpeedSlider } from './SpeedSlider';

export const Counter = () => {
  const iteration = useStore((state) => state.iteration);
  const cost = useStore((state) => state.cost);
  const status = useStore((state) => state.status);
  const performanceMode = useStore((state) => state.performanceMode);
  const multiRunMode = useStore((state) => state.multiRunMode);
  const currentRun = useStore((state) => state.currentRun);
  const iterationsLimitMode = useStore((state) => state.iterationsLimitMode);
  const iterationsLimit = useStore((state) => state.iterationsLimit);

  if (performanceMode && status === 'running') {
    return null;
  }

  return (
    <div className='counter'>
      <div className='counter__inner'>
        <span className='counter__iteration'>
          {multiRunMode && `Run: ${currentRun}, `}
          Iterations: {iteration}
          {iterationsLimitMode && `/${iterationsLimit || 1}`}
        </span>
        <span className='counter__best-tour'>{cost || 0} km</span>
      </div>
      {!performanceMode && <SpeedSlider />}
    </div>
  );
};
