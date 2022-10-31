import cn from 'classnames';

import { IoMdRefresh } from 'react-icons/io';
import { FaSquare } from 'react-icons/fa';
import { PanelButton } from './buttons/PanelButton';
import { SettingsButton } from './buttons/SettingsButton';
import { StartPauseButton } from './buttons/StartPauseButton';
import { MarkerModeButton } from './buttons/MarkerModeButton';
import { Counter } from './Counter';
import { Settings } from './Settings';
import { useStore } from '~/store';

type DisabledButtons = {
  startPause?: boolean;
  stop?: boolean;
  markerMode?: boolean;
  resetMarkers?: boolean;
  settings?: boolean;
  import?: boolean;
};

export const ControlPanel = () => {
  const status = useStore((state) => state.status);
  const settingsOpen = useStore((state) => state.settingsOpen);
  const markers = useStore((state) => state.markers);
  const markerModeOn = useStore((state) => state.markerModeOn);
  const selectedWorker = useStore((state) => state.selectedWorker);
  const performanceMode = useStore((state) => state.performanceMode);
  const startRun = useStore((state) => state.startRun);
  const stopRun = useStore((state) => state.stopRun);
  const pauseRun = useStore((state) => state.pauseRun);
  const resumeRun = useStore((state) => state.resumeRun);
  const setSettingsOpen = useStore((state) => state.setSettingsOpen);
  const setMarkers = useStore((state) => state.setMarkers);
  const setMarkerModeOn = useStore((state) => state.setMarkerModeOn);

  function getDisabledButtons(): DisabledButtons {
    switch (status) {
      case 'idle':
        return {
          stop: true,
        };
      case 'paused':
      case 'running':
        return {
          startPause: performanceMode,
          markerMode: true,
          resetMarkers: true,
          settings: true,
          import: true,
        };
    }
  }

  const disabledBtns = getDisabledButtons();

  return (
    <div
      className={cn('control-panel', {
        'control-panel--big': selectedWorker === 'Your JavaScript',
      })}
    >
      <div className='control-panel__inner'>
        <h1 className='control-panel__title'>Ant-TSP</h1>
        <StartPauseButton
          status={status}
          onStart={() => startRun()}
          onPause={pauseRun}
          onResume={resumeRun}
          disabled={markers.length === 0 || disabledBtns.startPause}
        />
        <PanelButton
          title='Stop'
          disabled={disabledBtns.stop}
          icon={<FaSquare size={12} />}
          onClick={stopRun}
        />
        <MarkerModeButton
          markerModeOn={markerModeOn}
          setMarkerModeOn={setMarkerModeOn}
          disabled={disabledBtns.markerMode}
        />
        <PanelButton
          disabled={markers.length == 0 || disabledBtns.resetMarkers}
          title='Reset Markers'
          icon={<IoMdRefresh size={30} />}
          onClick={() => setMarkers([])}
        />
        <SettingsButton
          settingsOpen={settingsOpen}
          onSetSettingsOpen={setSettingsOpen}
          disabled={disabledBtns.settings}
        />
      </div>
      <Settings />
      <Counter />
    </div>
  );
};
