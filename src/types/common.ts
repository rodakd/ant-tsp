import { MapProps } from 'react-map-gl';
import { FromWorkerAction, ToWorkerAction } from './workers';

export type Store = {
  params: any;
  status: AppStatus;
  iteration: number;
  markers: Marker[];
  speedPercent: number;
  viewState: ViewState;
  worker: Worker | null;
  markerModeOn: boolean;
  settingsOpen: boolean;
  selectedWorker: string;
  bestTour: Marker[] | null;
  currentTour: Marker[] | null;
  bestToursHistory: HistoryEntry[];
  stopRun: () => void;
  startRun: () => void;
  pauseRun: () => void;
  resumeRun: () => void;
  setMarkers: (markers: Marker[]) => void;
  setSettingsOpen: (open: boolean) => void;
  setSpeed: (speedPercent: number) => void;
  setViewState: (viewState: ViewState) => void;
  setSelectedWorker: (workerName: string) => void;
  workerDispatch: (action: ToWorkerAction) => void;
  setMarkerModeOn: (markerModeOn: boolean) => void;
  setParams: (newParams: any) => void;
  handleWorkerAction: (event: FromWorkerAction) => void;
};

export type AppStatus = 'running' | 'paused' | 'idle';

export type Longitude = number;
export type Latitude = number;
export type Marker = [Longitude, Latitude];

export type ViewState = Partial<MapProps['viewState']>;

export type Preset = {
  viewState: NonNullable<ViewState>;
  markers: Marker[];
};

export type HistoryEntry = {
  cost: number;
  iteration: number;
};
