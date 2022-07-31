import { MapProps } from 'react-map-gl';
import { WorkerParams } from './params';
import { FromWorkerAction, IntersectedWorkerParams, ToWorkerAction } from './workers';

export type Store = {
  status: AppStatus;
  iteration: number;
  markers: Marker[];
  bestTour: Marker[] | null;
  currentTour: Marker[] | null;
  params: IntersectedWorkerParams;
  viewState: ViewState;
  worker: Worker | null;
  markerModeOn: boolean;
  selectedWorker: string;
  settingsOpen: boolean;
  stopRun: () => void;
  startRun: () => void;
  pauseRun: () => void;
  resumeRun: () => void;
  handleWorkerAction: (event: FromWorkerAction) => void;
  setBestTour: (bestTour: Marker[]) => void;
  setMarkers: (markers: Marker[]) => void;
  setSettingsOpen: (open: boolean) => void;
  setIteration: (iteration: number) => void;
  setParams: (newParams: Partial<WorkerParams>) => void;
  setViewState: (viewState: ViewState) => void;
  workerDispatch: (action: ToWorkerAction) => void;
  setSelectedWorker: (workerName: string) => void;
  setMarkerModeOn: (markerModeOn: boolean) => void;
};

export type AppStatus = 'running' | 'paused' | 'idle';

export type Marker = [number, number];

export type ViewState = Partial<MapProps['viewState']>;

export type Preset = {
  viewState: NonNullable<ViewState>;
  markers: Marker[];
};
