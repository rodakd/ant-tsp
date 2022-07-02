import { IoMdRefresh } from 'react-icons/io';
import { FaSquare } from 'react-icons/fa';
import { PanelButton } from './buttons/PanelButton';
import { Settings } from './Settings';
import { useAppState } from '../AppContext';
import { SettingsButton } from './buttons/SettingsButton';
import { StartPauseButton } from './buttons/StartPauseButton';
import { MarkerModeButton } from './buttons/MarkerModeButton';

export const ControlPanel = () => {
  const {
    status,
    settingsOpen,
    markerModeOn,
    markers,
    resetMarkers,
    setMarkerModeOn,
    setSettingsOpen,
    startRun,
    pauseRun,
    stopRun,
    resumeRun,
  } = useAppState();

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
          disabled={status == 'idle'}
          icon={<FaSquare size={12} />}
          onClick={stopRun}
        />
        <MarkerModeButton markerModeOn={markerModeOn} setMarkerModeOn={setMarkerModeOn} />
        <PanelButton title='Preset 1' icon={<span>1</span>} />
        <PanelButton title='Preset 2' icon={<span>2</span>} />
        <PanelButton
          disabled={markers.length == 0}
          title='Reset Markers'
          icon={<IoMdRefresh size={30} />}
          onClick={resetMarkers}
        />
        <SettingsButton settingsOpen={settingsOpen} onSetSettingsOpen={setSettingsOpen} />
      </div>
      <Settings />
    </div>
  );
};
