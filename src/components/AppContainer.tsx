import cn from 'classnames';

import { Map } from './Map';
import { useStore } from '~/store';
import { InfoBar } from './InfoBar';
import { DatasetsPanel } from './DatasetsPanel';
import { PausedOverlay } from './PausedOverlay';
import { MultiRunSummary } from './MultiRunSummary';
import { CurrentRunChart } from './Chart/CurrentRunChart';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { useWorkerCommunication } from '~/hooks/useWorkerCommunication';

export const AppContainer = () => {
  const markerModeOn = useStore((state) => state.markerModeOn);

  useWorkerCommunication();

  return (
    <div className={cn('app-container', { 'app-container--marker-mode': markerModeOn })}>
      <InfoBar />
      <ControlPanel />
      <PausedOverlay />
      <CurrentRunChart />
      <MultiRunSummary />
      <Map />
      <DatasetsPanel />
    </div>
  );
};
