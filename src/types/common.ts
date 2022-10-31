import { MapProps } from 'react-map-gl';
import { FromWorkerAction, ToWorkerAction } from './workers';

export type Store = {
  params: any;
  status: AppStatus;
  iteration: number;
  markers: Marker[];
  hideChart: boolean;
  speedPercent: number;
  viewState: ViewState;
  worker: Worker | null;
  markerModeOn: boolean;
  settingsOpen: boolean;
  datasetsOpen: boolean;
  selectedWorker: string;
  performanceMode: boolean;
  bestTour: Marker[] | null;
  currentTour: Marker[] | null;
  bestToursHistory: HistoryEntry[];
  stopRun: () => void;
  startRun: () => void;
  pauseRun: () => void;
  resumeRun: () => void;
  setParams: (newParams: any) => void;
  setMarkers: (markers: Marker[]) => void;
  setSettingsOpen: (open: boolean) => void;
  setDatasetsOpen: (open: boolean) => void;
  setSpeed: (speedPercent: number) => void;
  setHideChart: (hideChart: boolean) => void;
  setViewState: (viewState: ViewState) => void;
  setSelectedWorker: (workerName: string) => void;
  workerDispatch: (action: ToWorkerAction) => void;
  setMarkerModeOn: (markerModeOn: boolean) => void;
  handleWorkerAction: (event: FromWorkerAction) => void;
  setPerformanceMode: (performanceMode: boolean) => void;
};

export type AppStatus = 'running' | 'paused' | 'idle';

export type Longitude = number;
export type Latitude = number;
export type Marker = [Longitude, Latitude];

export type ViewState = Partial<MapProps['viewState']>;

export type Dataset = {
  name: string;
  viewState: NonNullable<ViewState>;
  markers: Marker[];
};

export type HistoryEntry = {
  cost: number;
  iteration: number;
};
