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
        <Line type='monotone' dataKey='cost' name='Cost' stroke='#00adff' dot={false} />
        <XAxis dataKey='iteration' />
        <YAxis
          dataKey='cost'
          tickFormatter={(tick) => {
            if (tick >= 1000000) {
              return `${tick / 1000000}M`;
            }
            if (tick >= 1000) {
              return `${tick / 1000}k`;
            }
            return tick;
          }}
        />
        <Tooltip
          labelFormatter={(v) => `Iteration: ${v}`}
          formatter={(str: string) => Number(str).toLocaleString('en-US')}
        />
      </LineChart>
      <Export />
    </div>
  );
};
