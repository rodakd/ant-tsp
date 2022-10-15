import { MapProps } from 'react-map-gl';
import { WorkerParams } from './params';
import { FromWorkerAction, ToWorkerAction } from './workers';

export type Store = {
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
  params: any;
  stopRun: () => void;
  startRun: () => void;
  pauseRun: () => void;
  resumeRun: () => void;
  setMarkers: (markers: Marker[]) => void;
  setSettingsOpen: (open: boolean) => void;
  setSpeed: (speedPercent: number) => void;
  setBestTour: (bestTour: Marker[]) => void;
  setIteration: (iteration: number) => void;
  setViewState: (viewState: ViewState) => void;
  setSelectedWorker: (workerName: string) => void;
  workerDispatch: (action: ToWorkerAction) => void;
  setMarkerModeOn: (markerModeOn: boolean) => void;
  setParams: (newParams: Partial<WorkerParams>) => void;
  handleWorkerAction: (event: FromWorkerAction) => void;
};

export type AppStatus = 'running' | 'paused' | 'idle';

export type Marker = [number, number];

export type ViewState = Partial<MapProps['viewState']>;

export type Preset = {
  viewState: NonNullable<ViewState>;
  markers: Marker[];
};
