import { Marker } from './common';

export type WorkerState = {
  paused: boolean;
  running: boolean;
};

export type WorkerResult = Promise<{
  path: Marker[];
  cost: number;
}>;

export type WorkerAction<AlgoParams> =
  | { type: 'run'; payload: AlgoParams }
  | { type: 'stop'; payload?: never }
  | { type: 'pause'; payload?: never }
  | { type: 'resume'; payload?: never };

export type WorkerConfig = {
  worker: new () => Worker;
  params: Record<string, ParamConfig>;
};

export type ParamConfig = {
  label: string;
} & { type: 'number'; step?: number; min?: number; max?: number; default?: number };

export type ACOParams = {
  evaporation: number;
  qParam: number;
  alpha: number;
  beta: number;
  percentOfAnts: number;
  iterations: number;
};
