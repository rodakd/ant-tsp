import type { HistoryEntry, Marker } from './common';

export interface WorkerInterface {
  paused: boolean;
  running: boolean;
  markers: Marker[];
  iteration: number;
  speedPercent: number;
  helpers: WorkerHelpers;
  performanceMode: boolean;
  params: Record<string, any>;
  iterationsLimit: number | null;

  end: () => void;
  log: (toLog: any) => void;
  sleep: () => Promise<void>;
  error: (text?: string) => void;

  getInput: () => {
    n: number;
    cost: number;
    d: number[][];
    tour: number[];
    params: Record<string, any>;
  };

  incrementIteration: () => void;

  updateTrail: (getTrail: () => number[]) => Promise<void>;
  updateCurrentTour: (getCurrentTour: () => number[]) => Promise<void>;
  updateBestTour: (getBestTour: () => number[], cost: number) => Promise<void>;
}

export interface WorkerHelpers {
  matrixCost: (d: number[][], tour: number[]) => number;
  tourToSuccessors: (tour: number[]) => number[];
  successorsToTour: (succ: number[]) => number[];
}

export type App = Readonly<WorkerInterface>;

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
