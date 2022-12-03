import cn from 'classnames';

import { Param } from './Param';
import { Checkbox, Select } from 'antd';
import { AVAILABLE_WORKERS } from '~/workers';
import { useStore } from '~/store';

const Option = Select.Option;

export const Settings = () => {
  const hidePath = useStore((state) => state.hidePath);
  const paramsState = useStore((state) => state.params);
  const hideChart = useStore((state) => state.hideChart);
  const settingsOpen = useStore((state) => state.settingsOpen);
  const multiRunMode = useStore((state) => state.multiRunMode);
  const sateliteMode = useStore((state) => state.sateliteMode);
  const multiRunLimit = useStore((state) => state.multiRunLimit);
  const selectedWorker = useStore((state) => state.selectedWorker);
  const performanceMode = useStore((state) => state.performanceMode);
  const iterationsLimit = useStore((state) => state.iterationsLimit);
  const iterationsLimitMode = useStore((state) => state.iterationsLimitMode);

  const setParams = useStore((state) => state.setParams);
  const setHidePath = useStore((state) => state.setHidePath);
  const setHideChart = useStore((state) => state.setHideChart);
  const setSateliteMode = useStore((state) => state.setSateliteMode);
  const setMultiRunMode = useStore((state) => state.setMultiRunMode);
  const setMultiRunLimit = useStore((state) => state.setMultiRunLimit);
  const setSelectedWorker = useStore((state) => state.setSelectedWorker);
  const setIterationsLimit = useStore((state) => state.setIterationsLimit);
  const setPerformanceMode = useStore((state) => state.setPerformanceMode);
  const setIterationsLimitMode = useStore((state) => state.setIterationsLimitMode);

  function getWorkerOptions() {
    return Object.keys(AVAILABLE_WORKERS).map((workerName) => (
      <Option key={workerName} value={workerName}>
        {workerName}
      </Option>
    ));
  }

  function getWorkerParams() {
    const workerConfig = AVAILABLE_WORKERS[selectedWorker];

    if (!workerConfig?.params) {
      return;
    }

    return Object.entries(workerConfig.params).map(([name, p]: any) => {
      const restProps = { ...p };
      delete restProps['label'];

      return (
        <Param
          key={name}
          title={p.label}
          value={paramsState[name]}
          onChange={(value: any) => setParams({ [name]: value })}
          {...restProps}
        />
      );
    });
  }

  return (
    <div
      className={cn('settings', {
        'settings--visible': settingsOpen,
      })}
    >
      <Checkbox checked={performanceMode} onChange={(e) => setPerformanceMode(e.target.checked)}>
        Performance Mode
      </Checkbox>
      <Checkbox checked={hideChart} onChange={(e) => setHideChart(e.target.checked)}>
        Hide Chart
      </Checkbox>
      <Checkbox checked={hidePath} onChange={(e) => setHidePath(e.target.checked)}>
        Hide Path
      </Checkbox>
      <Checkbox checked={sateliteMode} onChange={(e) => setSateliteMode(e.target.checked)}>
        Satelite Mode
      </Checkbox>
      <Checkbox checked={multiRunMode} onChange={(e) => setMultiRunMode(e.target.checked)}>
        Multi-Run Mode
      </Checkbox>
      <Checkbox
        checked={iterationsLimitMode}
        onChange={(e) => setIterationsLimitMode(e.target.checked)}
      >
        Limit Iterations
      </Checkbox>
      {multiRunMode ? (
        <Param
          title='runs'
          value={multiRunLimit}
          onChange={(value: any) => {
            setMultiRunLimit(value);
          }}
          type='number'
          min={2}
        />
      ) : iterationsLimitMode ? (
        <div></div>
      ) : null}
      {iterationsLimitMode && (
        <Param
          title='iterations'
          value={iterationsLimit}
          onChange={(value: any) => setIterationsLimit(value)}
          type='number'
          min={1}
        />
      )}
      <Select value={selectedWorker} onSelect={setSelectedWorker}>
        {getWorkerOptions()}
      </Select>
      {getWorkerParams()}
    </div>
  );
};
