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
};

export type WorkerResult = Promise<{
  path: Marker[];
  cost: number;
}>;

export type WorkerAction =
  | { type: 'run'; params: IntersectedWorkerParams }
  | { type: 'stop' }
  | { type: 'pause' }
  | { type: 'resume' };

export type WorkerConfig = {
  worker: new () => Worker;
  params?: Record<string, ParamConfig>;
};

export type ParamConfig = {
  label: string;
} & { type: 'number'; default: number; step?: number; min?: number; max?: number };

export type IntersectedWorkerParams = UnionToIntersection<WorkerParams>;
