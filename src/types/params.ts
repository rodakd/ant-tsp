export type ACOParams = {
  evaporation: number;
  qParam: number;
  alpha: number;
  beta: number;
  percentOfAnts: number;
};

export type CustomParams = {
  code: string;
};

export type WorkerParams = ACOParams | CustomParams;
