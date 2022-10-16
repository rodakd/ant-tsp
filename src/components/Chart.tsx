import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useStore } from '~/store';
import { Export } from './Export';

export const Chart = () => {
  const bestToursHistory = useStore((state) => state.bestToursHistory);

  if (bestToursHistory.length === 0) {
    return null;
  }

  return (
    <div className='chart'>
      <LineChart width={600} height={300} data={bestToursHistory}>
        <Line type='monotone' dataKey='cost' name='Cost' stroke='#00adff' />
        <XAxis dataKey='iteration' />
        <YAxis dataKey='cost' />
        <Tooltip labelFormatter={(v) => `Iteration: ${v}`} />
      </LineChart>
      <Export />
    </div>
  );
};
