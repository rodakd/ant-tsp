import cn from 'classnames';
import { IoMdClose } from 'react-icons/io';
import { useStore } from '~/store';
import { MultiRunSummary as MultiRunSummaryType } from '~/types';
import { Chart } from './Chart/Chart';
import { PanelButton } from './ControlPanel/buttons/PanelButton';

export const MultiRunSummary = () => {
  const multiRunSummaryOpen = useStore((state) => state.multiRunSummaryOpen);
  const multiRunSummary = useStore((state) => state.multiRunSummary);
  const setMultiRunSummaryOpen = useStore((state) => state.setMultiRunSummaryOpen);

  const { bestToursHistories } = multiRunSummary;

  return (
    <div className={cn('multi-run-summary', { 'multi-run-summary--open': multiRunSummaryOpen })}>
      <PanelButton
        icon={<IoMdClose />}
        title='Close Summary'
        onClick={() => setMultiRunSummaryOpen(false)}
      />
      <h4 className='multi-run-summary__title'>Multi-Run Summary</h4>
      {multiRunSummaryOpen && (
        <MultiRunSummaryCharts
          bestToursHistories={bestToursHistories}
          visible={multiRunSummaryOpen}
        />
      )}
    </div>
  );
};

export const MultiRunSummaryCharts = ({
  bestToursHistories,
}: MultiRunSummaryType & { visible: boolean }) => {
  const getAverageCost = () => {
    const sum = bestToursHistories.reduce((acc, history) => {
      return acc + history[history.length - 1]?.cost;
    }, 0);
    return sum / bestToursHistories.length;
  };

  const getBestHistory = () => {
    const best = bestToursHistories.reduce((a, b) =>
      a[a.length - 1]?.cost > b[b.length - 1]?.cost ? b : a
    );
    return {
      history: best,
      idx: bestToursHistories.findIndex((history) => history === best),
      cost: best[best.length - 1]?.cost,
    };
  };

  const best = getBestHistory();

  return (
    <div className='multi-run-summary__charts'>
      <h5 className='multi-run-summary__stat'>
        Total Runs: <strong>{bestToursHistories.length}</strong> Average:
        <strong>{getAverageCost().toFixed(2)} km</strong> Best: <strong>{best.cost} km</strong>
      </h5>
      <div className='multi-run-summary__best'></div>
      {bestToursHistories.map((history, idx) => {
        return (
          <div key={idx} className='multi-run-summary__item'>
            <h5 className='multi-run-summary__item-title'>
              Run: {idx + 1}, Cost: {history[history.length - 1]?.cost.toFixed(2)} km
            </h5>
            <Chart bestToursHistory={history} />
          </div>
        );
      })}
    </div>
  );
};
