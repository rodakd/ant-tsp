import type { HistoryEntry, Marker } from './common';

export interface WorkerInterface {
  params: any;
  paused: boolean;
  running: boolean;
  markers: Marker[];
  iteration: number;
  speedPercent: number;
  performanceMode: boolean;
  bestTour: Marker[] | null;
  currentTour: Marker[] | null;
  iterationsLimit: number | null;
  end: () => void;
  log: (toLog: any) => void;
  sleep: () => Promise<void>;
  error: (text?: string) => void;
  calcCostByArray: (tour: Marker[] | null) => number;
  calcCostByMatrix: (matrix: number[][], tour: number[]) => number;
  getDistanceMatrix: () => number[][];
  getRandomIdxTour: () => number[];
  idxTourToDS2opt: (idxTour: number[]) => number[];
  ds2optToIdxTour: (t: number[]) => number[];
  idxTourToMarkerPath: (idxTour: number[]) => Marker[];
  idxTourToSuccessors: (idxTour: number[]) => number[];
  successorsToIdxTour: (succ: number[]) => number[];
  updateIteration: (iteration: number) => void;
  updateBestTour: (bestTour: Marker[], cost: number) => void;
  updateBestTourByDS2opt: (t: number[], cost: number) => void;
  updateBestTourByIdxTour: (idxTour: number[], cost: number) => void;
  updateBestTourBySuccessors: (successors: number[], cost: number) => void;
  updateCurrentTourByDS2opt: (t: number[]) => void;
  updateCurrentTour: (currentTour: Marker[]) => void;
  updateCurrentTourBySuccessors: (t: number[]) => void;
  updateCurrentTourByIdxTour: (idxTour: number[]) => void;
  updateTrail: (trail: Marker[]) => void;
  updateTrailByIdxTour: (idxTour: number[]) => void;
}

export type ToWorkerAction =
  | {
      type: 'run';
      params: any;
      markers: Marker[];
      speedPercent: number;
      performanceMode: boolean;
      iterationsLimit: number | null;
    }
  | { type: 'stop' }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'changeSpeed'; speedPercent: number };

export type FromWorkerAction =
  | { type: 'updateIteration'; iteration: number }
  | { type: 'updateBestTour'; bestTour: Marker[]; bestToursHistory: HistoryEntry[]; cost: number }
  | { type: 'updateCurrentTour'; currentTour: Marker[] }
  | { type: 'updateTrail'; trail: Marker[] }
  | { type: 'log'; toLog: any }
  | { type: 'error'; text?: string }
  | {
      type: 'end';
      bestTour: Marker[];
      bestToursHistory: HistoryEntry[];
      cost: number;
      iterations: number;
    };

export type WorkerConfig = {
  workerClass: new () => Worker;
  worker: Worker;
  params?: Record<string, ParamConfig>;
};

export type ParamConfig = {
  label: string;
} & (
  | { type: 'number'; default: number; step?: number; min?: number; max?: number }
  | { type: 'code'; default: string }
);
