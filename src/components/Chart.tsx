import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Page A', uv: 400 },
  { name: 'Page B', uv: 1000 },
  { name: 'Page C', uv: 1100 },
];

export const Chart = () => {
  return (
    <div className='chart'>
      <LineChart width={600} height={300} data={data}>
        <Line type='monotone' dataKey='uv' stroke='#8884d8' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};
