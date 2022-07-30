import * as t from '~/types';

import { IoMdRefresh } from 'react-icons/io';
import { FaSquare } from 'react-icons/fa';
import { PanelButton } from './buttons/PanelButton';
import { Settings } from './Settings';
import { useAppState } from '../AppContext';
import { SettingsButton } from './buttons/SettingsButton';
import { StartPauseButton } from './buttons/StartPauseButton';
import { MarkerModeButton } from './buttons/MarkerModeButton';
import { AppStatus } from '~/types';
import { PRESET_1, PRESET_2 } from '~/constants';

export const ControlPanel = () => {
  const {
    status,
    settingsOpen,
    markerModeOn,
    markers,
    setMarkerModeOn,
    setSettingsOpen,
    startRun,
    pauseRun,
    stopRun,
    resumeRun,
    setMarkers,
    setViewState,
  } = useAppState();

  const disabledBtns = getDisabledButtons(status);

  const setPreset = (preset: t.Preset) => {
    setViewState(preset.viewState);
    setMarkers(preset.markers);
  };

  return (
    <div className='control-panel'>
      <div className='control-panel__inner'>
        <h1 className='control-panel__title'>Ant-TSP</h1>
        <StartPauseButton
          status={status}
          onStart={startRun}
          onPause={pauseRun}
          onResume={resumeRun}
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
          title='Preset 1'
          icon={<span>1</span>}
          disabled={disabledBtns.preset1}
          onClick={() => {
            setPreset(PRESET_1);
          }}
        />
        <PanelButton
          title='Preset 2'
          icon={<span>2</span>}
          disabled={disabledBtns.preset2}
          onClick={() => setPreset(PRESET_2)}
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
    </div>
  );
};

type DisabledButtons = {
  stop?: boolean;
  markerMode?: boolean;
  preset1?: boolean;
  preset2?: boolean;
  resetMarkers?: boolean;
  settings?: boolean;
};

function getDisabledButtons(status: AppStatus): DisabledButtons {
  switch (status) {
    case 'idle':
      return {
        stop: true,
      };
    case 'paused':
    case 'running':
      return {
        markerMode: true,
        preset1: true,
        preset2: true,
        resetMarkers: true,
        settings: true,
      };
  }
}
