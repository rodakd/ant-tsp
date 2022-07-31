import { MapProps } from 'react-map-gl';
import { WorkerParams } from './params';
import { IntersectedWorkerParams, WorkerAction } from './workers';

export type Store = {
  bestTour: number;
  status: AppStatus;
  iteration: number;
  markers: Marker[];
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
  setBestTour: (tour: number) => void;
  setMarkers: (markers: Marker[]) => void;
  setSettingsOpen: (open: boolean) => void;
  setIteration: (iteration: number) => void;
  setParams: (newParams: Partial<WorkerParams>) => void;
  setViewState: (viewState: ViewState) => void;
  workerDispatch: (action: WorkerAction) => void;
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
