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
  updateIteration: (iteration: number) => void;
  updateBestTour: (bestTour: Marker[], cost: number) => void;
  calcCostByArray: (tour: Marker[] | null) => number;
  calcCostByMatrix: (matrix: number[][], tour: number[]) => number;
  getDistanceMatrix: () => number[][];

  // Gets random idx tour
  getRandomIdxTour: () => number[];

  // Parses idxTour to 2-opt data structure which allows linear time moving
  idxTourToDS2opt: (idxTour: number[]) => number[];

  // Parses 2-opt data structure to idx tour
  ds2optToIdxTour: (t: number[]) => number[];

  // Parses idx tour to marker path
  idxTourToMarkerPath: (idxTour: number[]) => Marker[];

  updateBestTourByDS2opt: (t: number[], cost: number) => void;
  updateCurrentTourByDS2opt: (t: number[]) => void;
  updateCurrentTour: (currentTour: Marker[]) => void;
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
