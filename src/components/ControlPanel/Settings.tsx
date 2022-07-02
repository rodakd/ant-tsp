import cn from 'classnames';
import useAppState from '../AppContext';
import { Param } from './Param';

export const Settings = () => {
  const {
    settingsOpen,
    evaporation,
    qParam,
    alpha,
    beta,
    percentOfAnts,
    iterations,
    setEvaporation,
    setQParam,
    setAlpha,
    setBeta,
    setIterations,
    setPercentOfAnts,
  } = useAppState();

  return (
    <div className={cn('settings', { 'settings--open': settingsOpen })}>
      <Param
        type='number'
        title='evaporation'
        value={evaporation}
        onChange={(e) => setEvaporation(Number(e.currentTarget.value))}
        step={0.1}
      />
      <Param
        type='number'
        title='Q'
        value={qParam}
        onChange={(e) => setQParam(Number(e.currentTarget.value))}
      />
      <Param
        type='number'
        title='alpha'
        value={alpha}
        onChange={(e) => setAlpha(Number(e.currentTarget.value))}
        min={0}
      />
      <Param
        type='number'
        title='beta'
        value={beta}
        onChange={(e) => setBeta(Number(e.currentTarget.value))}
        min={0}
      />
      <Param
        type='number'
        title='% of ants'
        value={percentOfAnts}
        onChange={(e) => {
          setPercentOfAnts(Number(e.currentTarget.value));
        }}
        min={1}
        max={100}
      />
      <Param
        type='number'
        title='iterations'
        value={iterations}
        onChange={(e) => setIterations(Number(e.currentTarget.value))}
        min={1}
      />
    </div>
  );
};
