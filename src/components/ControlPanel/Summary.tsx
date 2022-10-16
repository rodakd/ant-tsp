import { RunSummary } from '~/types';

export const Summary = ({ summary }: { summary: RunSummary }) => {
  return (
    <div className='summary'>
      <span className='summary__iteration'>Iterations: {summary.iterations}</span>
      <span className='summary__best-tour'>{summary.bestCost.toFixed(2)} km</span>
    </div>
  );
};
