import { Marker } from './common';

export interface WorkerInterface {
  paused: boolean;
  running: boolean;
  markers: Marker[];
  bestTour: Marker[] | null;
  currentTour: Marker[] | null;
  speedPercent: number;
  iteration: number;
  params: any;
  updateIteration: (iteration: number) => void;
  updateBestTour: (bestTour: Marker[]) => void;
  updateCurrentTour: (currentTour: Marker[]) => void;
  sleep: () => Promise<void>;
  log: (toLog: any) => void;
  calculateCost: (tour: Marker[] | null) => number;
  error: (text?: string) => void;
  end: () => void;
}

export type ToWorkerAction =
  | { type: 'run'; params: any; markers: Marker[]; speedPercent: number }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'changeSpeed'; speedPercent: number };

export type FromWorkerAction =
  | { type: 'updateIteration'; iteration: number }
  | { type: 'updateBestTour'; bestTour: Marker[] }
  | { type: 'updateCurrentTour'; currentTour: Marker[] }
  | { type: 'log'; toLog: any }
  | { type: 'error'; text?: string }
  | { type: 'end' };

export type WorkerConfig = {
  worker: new () => Worker;
  params?: Record<string, ParamConfig>;
};

export type ParamConfig = {
  label: string;
} & (
  | { type: 'number'; default: number; step?: number; min?: number; max?: number }
  | { type: 'code'; default: string }
);
