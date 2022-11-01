import { MapProps } from 'react-map-gl';
import { FromWorkerAction, ToWorkerAction } from './workers';

export type Store = {
  params: any;
  status: AppStatus;
  iteration: number;
  markers: Marker[];
  hideChart: boolean;
  currentRun: number;
  speedPercent: number;
  viewState: ViewState;
  worker: Worker | null;
  markerModeOn: boolean;
  settingsOpen: boolean;
  datasetsOpen: boolean;
  multiRunMode: boolean;
  multiRunLimit: number;
  selectedWorker: string;
  iterationsLimit: number;
  performanceMode: boolean;
  bestTour: Marker[] | null;
  currentTour: Marker[] | null;
  iterationsLimitMode: boolean;
  multiRunSummaryOpen: boolean;
  bestToursHistory: HistoryEntry[];
  multiRunSummary: MultiRunSummary | null;

  pauseRun: () => void;
  resumeRun: () => void;
  stopRun: (manual?: boolean) => void;
  setParams: (newParams: any) => void;
  startRun: (currentRun?: number) => void;
  setMarkers: (markers: Marker[]) => void;
  setSettingsOpen: (open: boolean) => void;
  setDatasetsOpen: (open: boolean) => void;
  setSpeed: (speedPercent: number) => void;
  setHideChart: (hideChart: boolean) => void;
  setViewState: (viewState: ViewState) => void;
  setSelectedWorker: (workerName: string) => void;
  workerDispatch: (action: ToWorkerAction) => void;
  setMarkerModeOn: (markerModeOn: boolean) => void;
  setMultiRunMode: (multiRunMode: boolean) => void;
  setMultiRunLimit: (multiRunLimit: number) => void;
  setIterationsLimit: (iterationsLimit: number) => void;
  handleWorkerAction: (event: FromWorkerAction) => void;
  setPerformanceMode: (performanceMode: boolean) => void;
  setIterationsLimitMode: (iterationsLimitModel: boolean) => void;
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

export type MultiRunSummary = {
  bestToursHistories: HistoryEntry[][];
};
