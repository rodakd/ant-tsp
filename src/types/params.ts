export type ACOParams = {
  evaporation: number;
  qParam: number;
  alpha: number;
  beta: number;
  percentOfAnts: number;
  iterations: number;
};

export type NearestNeighborParams = {
  dupa: number;
};

export type WorkerParams = ACOParams | NearestNeighborParams;
