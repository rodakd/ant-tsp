import { Marker } from './common';
import { WorkerParams } from './params';

export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never;

export type WorkerState = {
  paused: boolean;
  running: boolean;
  updateIteration: (iteration: number) => void;
  updateBestTour: (bestTour: number) => void;
};

export type ToWorkerAction =
  | { type: 'run'; params: IntersectedWorkerParams }
  | { type: 'stop' }
  | { type: 'pause' }
  | { type: 'resume' };

export type FromWorkerAction =
  | { type: 'updateIteration'; iteration: number }
  | { type: 'updateBestTour'; bestTour: number };

export type WorkerConfig = {
  worker: new () => Worker;
  params?: Record<string, ParamConfig>;
};

export type ParamConfig = {
  label: string;
} & { type: 'number'; default: number; step?: number; min?: number; max?: number };

export type IntersectedWorkerParams = UnionToIntersection<WorkerParams>;
