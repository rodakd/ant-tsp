import { BASE_DELAY_MS, DEFAULT_SPEED_PERCENT } from '../constants';
import {
  createDistanceMatrix,
  createRandomPermutation,
  idxTourToMarkerPath,
  idxTourToSuccessors,
  matrixCost,
  prepareMarkers,
  successorsToIdxTour,
} from '../helpers';
import { HistoryEntry } from '../types';
import * as t from '../types';

export function appDispatch(action: t.FromWorkerAction) {
  if (typeof postMessage === 'function') {
    postMessage(action);
  }
}

export const createWorker = (algorithm: (workerInterface: t.WorkerInterface) => Promise<void>) => {
  let wi: t.WorkerInterface = new WorkerInstance();

  onmessage = async (event) => {
    if (!event?.data?.type) {
      return;
    }

    const action = event.data as t.ToWorkerAction;

    switch (action.type) {
      case 'run':
        wi = new WorkerInstance();

        wi.params = action.params;
        wi.markers = prepareMarkers(action.markers);
        wi.speedPercent = action.speedPercent;
        wi.iterationsLimit = action.iterationsLimit;
        wi.performanceMode = action.performanceMode;

        algorithm(wi).catch((err) => {
          if (err === 'Stopped') {
            return;
          }
          throw err;
        });

        break;
      case 'stop':
        wi.running = false;
        break;
      case 'pause':
        wi.paused = true;
        break;
      case 'resume':
        wi.paused = false;
        break;
      case 'changeSpeed':
        wi.speedPercent = action.speedPercent;
    }
  };
};

export class WorkerInstance implements t.WorkerInterface {
  private bestTour: t.Marker[] = [];

  params = {};
  markers: t.Marker[] = [];
  iteration = 0;
  paused = false;
  running = true;
  cost = Infinity;
  performanceMode = false;
  speedPercent = DEFAULT_SPEED_PERCENT;
  iterationsLimit: number | null = null;
  bestToursHistory: HistoryEntry[] = [];
  lastGetBestTour: (() => number[]) | null = null;

  lastTourUpdate = 0;
  lastIterationUpdate = 0;

  getInput() {
    const d = createDistanceMatrix(this.markers);
    const tour = createRandomPermutation(this.markers.length);
    const cost = matrixCost(d, tour);
    const n = this.markers.length;
    const params = this.params;

    this.updateBestTour(() => tour, cost);

    return {
      d,
      tour,
      cost,
      n,
      params,
    };
  }

  async updateBestTour(getBestTour: () => number[], cost: number) {
    if (cost >= this.cost) {
      return;
    }
    this.cost = cost;

    const historyEntry = {
      cost,
      iteration: this.iteration,
    };
    this.bestToursHistory.push(historyEntry);

    if (!this.shouldUpdateTour()) {
      this.lastGetBestTour = getBestTour;
      return;
    }

    this.bestTour = idxTourToMarkerPath(getBestTour(), this.markers);

    appDispatch({
      type: 'updateBestTour',
      bestTour: this.bestTour,
      bestToursHistory: this.bestToursHistory,
      cost: this.cost,
    });

    await this.sleep();
  }

  async updateTrail(getTrail: () => number[]) {
    if (this.performanceMode) {
      return;
    }

    const trail = idxTourToMarkerPath(getTrail(), this.markers);

    appDispatch({
      type: 'updateTrail',
      trail,
    });

    await this.sleep();
  }

  incrementIteration() {
    this.iteration++;

    if (this.iterationsLimit && this.iteration > this.iterationsLimit) {
      this.iteration--;
      return this.end();
    }

    if (!this.shouldUpdateIteration()) {
      return;
    }

    appDispatch({ type: 'updateIteration', iteration: this.iteration });
  }

  async updateCurrentTour(getCurrentTour: () => number[]) {
    if (this.performanceMode) {
      return;
    }

    const currentTour = idxTourToMarkerPath(getCurrentTour(), this.markers);

    appDispatch({ type: 'updateCurrentTour', currentTour });

    await this.sleep();
  }

  async sleep() {
    if (!this.running) {
      throw 'Stopped';
    }

    if (this.performanceMode) {
      return;
    }

    while (this.paused && this.running) {
      await new Promise<void>((res) => setTimeout(res, 200));
    }

    const delay = BASE_DELAY_MS - (this.speedPercent / 100) * BASE_DELAY_MS + 50;
    return new Promise<void>((res) => setTimeout(res, delay));
  }

  log(toLog: any) {
    appDispatch({ type: 'log', toLog: JSON.stringify(toLog) });
  }

  error(text?: string) {
    appDispatch({
      type: 'error',
      text,
    });
  }

  end() {
    if (this.lastGetBestTour) {
      this.bestTour = idxTourToMarkerPath(this.lastGetBestTour(), this.markers);
    }

    appDispatch({
      type: 'end',
      cost: this.cost,
      bestTour: this.bestTour,
      iterations: this.iteration,
      bestToursHistory: this.bestToursHistory,
    });

    this.running = false;
    throw 'Stopped';
  }

  helpers = {
    matrixCost(matrix: number[][], tour: number[]) {
      return matrixCost(matrix, tour);
    },

    tourToSuccessors(idxTour: number[]) {
      return idxTourToSuccessors(idxTour);
    },

    successorsToTour(succ: number[]) {
      return successorsToIdxTour(succ);
    },
  };

  private shouldUpdateTour() {
    if (!this.performanceMode) {
      return true;
    }

    const now = Date.now();

    if (now - this.lastTourUpdate > 3000) {
      this.lastTourUpdate = now;
      return true;
    }

    return false;
  }

  private shouldUpdateIteration() {
    if (!this.performanceMode) {
      return true;
    }

    const now = Date.now();

    if (now - this.lastIterationUpdate > 3000) {
      this.lastIterationUpdate = now;
      return true;
    }

    return false;
  }
}
