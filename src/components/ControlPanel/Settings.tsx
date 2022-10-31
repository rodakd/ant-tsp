import _ from 'lodash';
import cn from 'classnames';

import { Param } from './Param';
import { Checkbox, Select } from 'antd';
import { AVAILABLE_WORKERS } from '~/workers';
import { useStore } from '~/store';

const Option = Select.Option;

export const Settings = () => {
  const settingsOpen = useStore((state) => state.settingsOpen);
  const selectedWorker = useStore((state) => state.selectedWorker);
  const paramsState = useStore((state) => state.params);
  const performanceMode = useStore((state) => state.performanceMode);
  const iterationsLimitMode = useStore((state) => state.iterationsLimitMode);
  const iterationsLimit = useStore((state) => state.iterationsLimit);
  const multiRunMode = useStore((state) => state.multiRunMode);
  const multiRunLimit = useStore((state) => state.multiRunLimit);
  const hideChart = useStore((state) => state.hideChart);

  const setHideChart = useStore((state) => state.setHideChart);
  const setMultiRunMode = useStore((state) => state.setMultiRunMode);
  const setIterationsLimitMode = useStore((state) => state.setIterationsLimitMode);
  const setMultiRunLimit = useStore((state) => state.setMultiRunLimit);
  const setIterationsLimit = useStore((state) => state.setIterationsLimit);

  const setPerformanceMode = useStore((state) => state.setPerformanceMode);
  const setParams = useStore((state) => state.setParams);
  const setSelectedWorker = useStore((state) => state.setSelectedWorker);

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
      const restProps = _.omit(p, ['label']);

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
