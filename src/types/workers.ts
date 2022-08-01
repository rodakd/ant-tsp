import { Marker } from './common';
import { WorkerParams } from './params';

export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never;

export type WorkerState<T = object> = {
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
};

export type ToWorkerAction =
  | { type: 'run'; params: IntersectedWorkerParams; markers: Marker[]; speedPercent: number }
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
} & { type: 'number'; default: number; step?: number; min?: number; max?: number };

export type IntersectedWorkerParams = UnionToIntersection<WorkerParams>;
