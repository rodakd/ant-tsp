import { MapViewState } from '@deck.gl/core/typed';
import type { FromWorkerAction, ToWorkerAction } from './workers';

export type Store = {
  params: any;
  cost: number;
  worker: Worker;
  status: AppStatus;
  iteration: number;
  markers: Marker[];
  hideChart: boolean;
  currentRun: number;
  speedPercent: number;
  viewState: ViewState;
  sateliteMode: boolean;
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
  multiRunSummary: MultiRunSummary;

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
  setSateliteMode: (sateliteMode: boolean) => void;
  workerDispatch: (action: ToWorkerAction) => void;
  setMarkerModeOn: (markerModeOn: boolean) => void;
  setMultiRunMode: (multiRunMode: boolean) => void;
  setMultiRunLimit: (multiRunLimit: number) => void;
  setIterationsLimit: (iterationsLimit: number) => void;
  handleWorkerAction: (event: FromWorkerAction) => void;
  setPerformanceMode: (performanceMode: boolean) => void;
  setMultiRunSummaryOpen: (multiRunSummaryOpen: boolean) => void;
  setIterationsLimitMode: (iterationsLimitModel: boolean) => void;
};

export type Latitude = number;
export type Longitude = number;
export type Marker = [Longitude, Latitude];
export type AppStatus = 'running' | 'paused' | 'idle';
export type ViewState = Partial<MapViewState>;

export type Dataset = {
  name: string;
  markers: Marker[];
  viewState: NonNullable<ViewState>;
};

export type HistoryEntry = {
  cost: number;
  iteration: number;
};

export type MultiRunSummary = {
  bestToursHistories: HistoryEntry[][];
};
