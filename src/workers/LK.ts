import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Basic Lin & Kernighan improvement procedure for the TSP
async function LK(app: Readonly<t.WorkerInterface>) {
  const noDSParse = app.performanceMode && !app.iterationsLimit;
  const d = app.getDistanceMatrix();
  const idxTour = app.getRandomIdxTour();
  const succ = app.idxTourToSuccessors(idxTour);

  app.end();
}

createWorker(LK);
