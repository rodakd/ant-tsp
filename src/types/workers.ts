import { Marker } from './common';

export interface WorkerInterface<T = object> {
  paused: boolean;
  running: boolean;
  markers: Marker[];
  bestTour: Marker[] | null;
  currentTour: Marker[] | null;
  speedPercent: number;
  iteration: number;
  params: T;
  updateIteration: (iteration: number) => void;
  updateBestTour: (bestTour: Marker[]) => void;
  updateCurrentTour: (currentTour: Marker[]) => void;
  sleep: () => Promise<void>;
}

export type ToWorkerAction =
  | { type: 'run'; params: any; markers: Marker[]; speedPercent: number }
  | { type: 'stop' }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'changeSpeed'; speedPercent: number };

export type FromWorkerAction =
  | { type: 'updateIteration'; iteration: number }
  | { type: 'updateBestTour'; bestTour: Marker[] }
  | { type: 'updateCurrentTour'; currentTour: Marker[] };

export type WorkerConfig = {
  worker: new () => Worker;
  params?: Record<string, ParamConfig>;
};

export type ParamConfig = {
  label: string;
} & (
  | { type: 'number'; default: number; step?: number; min?: number; max?: number }
  | { type: 'textarea'; default: string }
);
