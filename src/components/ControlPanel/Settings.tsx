import cn from 'classnames';
import { useAppState } from '~/components/AppContext';
import { Param } from './Param';
import { Select } from 'antd';
import { AVAILABLE_WORKERS } from '~/workers';

const Option = Select.Option;

export const Settings = () => {
  const {
    settingsOpen,
    selectedWorker,
    params: paramsState,
    setParams,
    setSelectedWorker,
  } = useAppState();

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
      return console.error('Invalid worker config for', selectedWorker);
    }

    return Object.entries(workerConfig.params).map(([name, p]) => (
      <Param
        key={name}
        title={p.label}
        type={p.type}
        value={paramsState[name]}
        min={p.min}
        max={p.max}
        step={p.step}
        onChange={(value) => setParams({ [name]: value })}
      />
    ));
  }

  return (
    <div className={cn('settings', { 'settings--visible': settingsOpen })}>
      <>
        <Select value={selectedWorker} onSelect={setSelectedWorker}>
          {getWorkerOptions()}
        </Select>
        {getWorkerParams()}
      </>
    </div>
  );
};
