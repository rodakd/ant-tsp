import cn from 'classnames';
import { useRef } from 'react';
import { MapRef } from 'react-map-gl';
import { useStore } from '~/store';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { Map } from './Map';
import { PausedOverlay } from './PausedOverlay';

export const AppContainer = () => {
  const status = useStore((state) => state.status);
  const markerModeOn = useStore((state) => state.markerModeOn);

  const mapRef = useRef<MapRef>(null);

  return (
    <div className={cn('app-container', { 'app-container--marker-mode': markerModeOn })}>
      {status === 'paused' && <PausedOverlay />}
      <ControlPanel mapRef={mapRef} />
      <Map mapRef={mapRef} />
    </div>
  );
};
