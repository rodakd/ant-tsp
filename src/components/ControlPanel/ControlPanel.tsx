import * as t from '~/types';

import { IoMdRefresh } from 'react-icons/io';
import { FaSquare } from 'react-icons/fa';
import { PanelButton } from './buttons/PanelButton';
import { SettingsButton } from './buttons/SettingsButton';
import { StartPauseButton } from './buttons/StartPauseButton';
import { MarkerModeButton } from './buttons/MarkerModeButton';
import { AppStatus } from '~/types';
import { PRESET_1, PRESET_2 } from '~/constants';
import { Counter } from './Counter';
import { Settings } from './Settings';
import { useStore } from '~/store';
import { MutableRefObject } from 'react';
import { MapRef } from 'react-map-gl';
import { SpeedSlider } from './SpeedSlider';

type Props = {
  mapRef: MutableRefObject<MapRef | null>;
};

export const ControlPanel = ({ mapRef }: Props) => {
  const status = useStore((state) => state.status);
  const settingsOpen = useStore((state) => state.settingsOpen);
  const markers = useStore((state) => state.markers);
  const markerModeOn = useStore((state) => state.markerModeOn);
  const startRun = useStore((state) => state.startRun);
  const stopRun = useStore((state) => state.stopRun);
  const pauseRun = useStore((state) => state.pauseRun);
  const resumeRun = useStore((state) => state.resumeRun);
  const setSettingsOpen = useStore((state) => state.setSettingsOpen);
  const setMarkers = useStore((state) => state.setMarkers);
  const setMarkerModeOn = useStore((state) => state.setMarkerModeOn);

  const setPreset = (preset: t.Preset) => {
    setMarkers(preset.markers);

    const map = mapRef.current;

    if (!map) {
      return;
    }

    const { longitude, latitude, zoom } = preset.viewState;

    if (longitude && latitude && zoom) {
      map.flyTo({ center: [longitude, latitude], zoom });
    }
  };

  const disabledBtns = getDisabledButtons(status);
  const runningOrPaused = status === 'running' || status === 'paused';

  return (
    <div className='control-panel'>
      <div className='control-panel__inner'>
        <h1 className='control-panel__title'>Ant-TSP</h1>
        <StartPauseButton
          status={status}
          onStart={startRun}
          onPause={pauseRun}
          onResume={resumeRun}
          disabled={markers.length === 0}
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
      {runningOrPaused && (
        <>
          <Counter />
        </>
      )}
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
