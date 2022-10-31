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
  const hideChart = useStore((state) => state.hideChart);
  const setHideChart = useStore((state) => state.setHideChart);
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
      <div className='settings__top'>
        <Checkbox checked={performanceMode} onChange={(e) => setPerformanceMode(e.target.checked)}>
          Performance Mode
        </Checkbox>
        <Checkbox checked={hideChart} onChange={(e) => setHideChart(e.target.checked)}>
          Hide Chart
        </Checkbox>
      </div>
      <Select value={selectedWorker} onSelect={setSelectedWorker}>
        {getWorkerOptions()}
      </Select>
      {getWorkerParams()}
    </div>
  );
};
