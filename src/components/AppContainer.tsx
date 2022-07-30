import cn from 'classnames';
import { useAppState } from './AppContext';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { Map } from './Map';
import { PausedOverlay } from './PausedOverlay';

export const AppContainer = () => {
  const { markerModeOn, status } = useAppState();

  return (
    <div className={cn('app-container', { 'app-container--marker-mode': markerModeOn })}>
      {status === 'paused' && <PausedOverlay />}
      <ControlPanel />
      <Map />
    </div>
  );
};
