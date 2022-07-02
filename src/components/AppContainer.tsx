import cn from 'classnames';
import { useAppState } from './AppContext';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { Map } from './Map';

export const AppContainer = () => {
  const { markerModeOn } = useAppState();

  return (
    <div className={cn('app-container', { 'app-container--marker-mode': markerModeOn })}>
      <ControlPanel />
      <Map />
    </div>
  );
};
