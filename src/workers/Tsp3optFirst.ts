import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Local search with 3-opt neighbourhood and first improvement policy
async function Tsp3optFirst(app: Readonly<t.WorkerInterface>) {
  const d = app.getDistanceMatrix();
  const idxTour = app.getRandomIdxTour();
  const succ = app.idxTourToSuccessors(idxTour);

  app.end();
}

createWorker(Tsp3optFirst);
