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
  calculateCost: (tour: Marker[] | null) => number;
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
  | { type: 'end'; bestTour: Marker[]; bestToursHistory: HistoryEntry[]; cost: number };

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
