import * as t from '~/types';

import _ from 'lodash';
import cn from 'classnames';

import { Param } from './Param';
import { Select } from 'antd';
import { AVAILABLE_WORKERS } from '~/workers';
import { useStore } from '~/store';

const Option = Select.Option;

export const Settings = () => {
  const settingsOpen = useStore((state) => state.settingsOpen);
  const selectedWorker = useStore((state) => state.selectedWorker);
  const paramsState = useStore((state) => state.params);
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
          value={paramsState[name as keyof t.WorkerParams]}
          onChange={(value: any) => setParams({ [name]: value })}
          {...restProps}
        />
      );
    });
  }

  return (
    <div className={cn('settings', { 'settings--visible': settingsOpen })}>
      <Select value={selectedWorker} onSelect={setSelectedWorker}>
        {getWorkerOptions()}
      </Select>
      {getWorkerParams()}
    </div>
  );
};
