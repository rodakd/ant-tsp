import { LineChart, Line, XAxis, YAxis, Tooltip, Label, Legend } from 'recharts';
import { useStore } from '~/store';

export const Chart = () => {
  const bestToursHistory = useStore((state) => state.bestToursHistory);

  if (bestToursHistory.length === 0) {
    return null;
  }

  return (
    <div className='chart'>
      <LineChart width={600} height={300} data={bestToursHistory}>
        <Line type='monotone' dataKey='cost' stroke='#00adff' />
        <XAxis dataKey='iteration'>
          <Label
            content={(props: any) => {
              return (
                <g transform='translate(-240, 0)'>
                  <text
                    style={{ fontSize: '12px' }}
                    x={props.viewBox.x + props.viewBox.width}
                    y={props.viewBox.y + props.viewBox.height + 3}
                    textAnchor='end'
                    fill='#bfbfbf'
                  >
                    Iteration
                  </text>
                </g>
              );
            }}
          />
        </XAxis>
        <YAxis>
          <Label
            content={(props: any) => {
              return (
                <g transform='translate(-260, 170)'>
                  <text
                    style={{ fontSize: '12px' }}
                    x={props.viewBox.x + props.viewBox.width}
                    y={props.viewBox.y + props.viewBox.height + 3}
                    textAnchor='end'
                    fill='#bfbfbf'
                    transform='rotate(-90)'
                  >
                    Cost (km)
                  </text>
                </g>
              );
            }}
          />
        </YAxis>
        <Tooltip />
      </LineChart>
    </div>
  );
};
