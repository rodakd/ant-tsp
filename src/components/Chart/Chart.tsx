import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { HistoryEntry } from '~/types';
import { Export } from '../Export';

type Props = {
  bestToursHistory: HistoryEntry[];
};

export const Chart = ({ bestToursHistory }: Props) => {
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
