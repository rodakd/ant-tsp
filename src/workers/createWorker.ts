import { BASE_DELAY_MS, DEFAULT_SPEED_PERCENT } from '../constants';
import {
  arrayCost,
  createDistanceMatrix,
  createRandomPermutation,
  ds2optToIdxTour,
  idxTourToDS2opt,
  matrixCost,
} from '../helpers';
import { HistoryEntry } from '../types';
import * as t from '../types';

export const createWorker = (
  algorithm: (workerInterface: t.WorkerInterface, params: any) => Promise<void>
) => {
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
        wi.markers = action.markers;
        wi.speedPercent = action.speedPercent;
        wi.iterationsLimit = action.iterationsLimit;
        wi.performanceMode = action.performanceMode;

        algorithm(wi, action.params).catch((err) => {
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

class WorkerInstance implements t.WorkerInterface {
  paused = false;
  running = true;
  bestTour: t.Marker[] | null = null;
  currentTour: t.Marker[] | null = null;
  cost = 0;
  iteration = 0;
  markers = [];
  params = {};
  speedPercent = DEFAULT_SPEED_PERCENT;
  performanceMode = false;
  iterationsLimit: number | null = null;
  bestToursHistory: HistoryEntry[] = [];

  updateBestTour(bestTour: t.Marker[], cost: number) {
    const fixedCost = Number(cost.toFixed(2));

    this.cost = fixedCost;
    this.bestTour = bestTour;
    this.bestToursHistory = this.bestToursHistory.concat({
      cost: fixedCost,
      iteration: this.iteration,
    });

    this.appDispatch({
      type: 'updateBestTour',
      bestTour: this.bestTour,
      bestToursHistory: this.bestToursHistory,
      cost: this.cost,
    });
  }

  updateIteration(iteration: number) {
    this.iteration = iteration;
    if (this.iterationsLimit && this.iteration >= this.iterationsLimit) {
      return this.end();
    }
    this.appDispatch({ type: 'updateIteration', iteration });
  }

  updateCurrentTour(currentTour: t.Marker[]) {
    this.currentTour = currentTour;
    this.appDispatch({ type: 'updateCurrentTour', currentTour });
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

    const delay = BASE_DELAY_MS - (this.speedPercent / 100) * BASE_DELAY_MS;
    return new Promise<void>((res) => setTimeout(res, delay));
  }

  log(toLog: any) {
    this.appDispatch({ type: 'log', toLog: JSON.stringify(toLog) });
  }

  error(text?: string) {
    postMessage({
      type: 'error',
      text,
    });
  }

  calcCostByArray(path: t.Marker[] | null) {
    return arrayCost(path);
  }

  calcCostByMatrix(matrix: number[][], idxTour: number[]) {
    return matrixCost(matrix, idxTour);
  }

  getDistanceMatrix() {
    return createDistanceMatrix(this.markers);
  }

  getRandomIdxTour() {
    return createRandomPermutation(this.markers.length);
  }

  idxTourToDS2opt(idxTour: number[]) {
    return idxTourToDS2opt(idxTour);
  }

  idxTourToMarkerPath(idxTour: number[]) {
    const path: t.Marker[] = [];
    idxTour.forEach((idx) => {
      path.push(this.markers[idx]);
    });
    path.push(this.markers[idxTour[0]]);
    return path;
  }

  ds2optToIdxTour(t: number[]) {
    return ds2optToIdxTour(t);
  }

  updateBestTourByDS2opt(t: number[], cost: number) {
    const idxTour = ds2optToIdxTour(t);
    const path = this.idxTourToMarkerPath(idxTour);
    this.updateBestTour(path, cost);
  }

  updateCurrentTourByDS2opt(t: number[]) {
    const idxTour = ds2optToIdxTour(t);
    const path = this.idxTourToMarkerPath(idxTour);
    this.updateCurrentTour(path);
  }

  end() {
    postMessage({
      type: 'end',
      bestTour: this.bestTour,
      bestToursHistory: this.bestToursHistory,
      cost: this.cost,
      iterations: this.iteration,
    });
    this.running = false;
    throw 'Stopped';
  }

  private appDispatch(action: t.FromWorkerAction) {
    if (!this.running) {
      throw 'Stopped';
    }

    if (this.performanceMode) {
      return;
    }

    postMessage(action);
  }
}
