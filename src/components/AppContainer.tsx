import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { MapRef } from 'react-map-gl';
import { useStore } from '~/store';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { Map } from './Map';
import { PausedOverlay } from './PausedOverlay';

export const AppContainer = () => {
  const status = useStore((state) => state.status);
  const markerModeOn = useStore((state) => state.markerModeOn);
  const worker = useStore((state) => state.worker);
  const handleWorkerAction = useStore((state) => state.handleWorkerAction);

  useEffect(() => {
    if (worker) {
      worker.onmessage = (evt) => handleWorkerAction(evt.data);
    }
  }, [worker]);

  const mapRef = useRef<MapRef>(null);

  return (
    <div className={cn('app-container', { 'app-container--marker-mode': markerModeOn })}>
      {status === 'paused' && <PausedOverlay />}
      <ControlPanel mapRef={mapRef} />
      <Map mapRef={mapRef} />
    </div>
  );
};
