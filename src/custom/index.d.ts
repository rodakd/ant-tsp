export interface WorkerInterface {
  paused: boolean;
  running: boolean;
  markers: Marker[];
  iteration: number;
  speedPercent: number;
  helpers: WorkerHelpers;
  performanceMode: boolean;
  params: Record<string, any>;
  iterationsLimit: number | null;

  end: () => void;
  log: (toLog: any) => void;
  sleep: () => Promise<void>;
  error: (text?: string) => void;

  getInput: () => {
    n: number;
    cost: number;
    d: number[][];
    tour: number[];
    params: Record<string, any>;
  };

  incrementIteration: () => void;

  updateTrail: (getTrail: () => number[]) => Promise<void>;
  updateCurrentTour: (getCurrentTour: () => number[]) => Promise<void>;
  updateBestTour: (getBestTour: () => number[], cost: number) => Promise<void>;
}

export interface WorkerHelpers {
  matrixCost: (d: number[][], tour: number[]) => number;
  tourToSuccessors: (tour: number[]) => number[];
  successorsToTour: (succ: number[]) => number[];
}

export type App = Readonly<WorkerInterface>;
