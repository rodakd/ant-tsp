export type RunParams = {
  evaporation: number;
  qParam: number;
  alpha: number;
  beta: number;
  percentOfAnts: number;
  iterations: number;
};

export type AppStatus = 'running' | 'paused' | 'idle';
