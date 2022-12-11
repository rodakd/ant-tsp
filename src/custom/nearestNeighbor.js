/** @type {import('./index').App} */
// eslint-disable-next-line no-undef
const app = globalThis['app'];

const { cost, d, tour, n } = app.getInput();

let length = cost,
  i,
  j,
  nearest,
  costIns;

function move(tour, i, nearest) {
  const swap = tour[i];
  tour[i] = tour[nearest];
  tour[nearest] = swap;
}

for (i = 1; i < n; i++) {
  nearest = i;
  costIns = d[tour[i - 1]][tour[i]];

  for (j = i + 1; j < n; j++) {
    app.incrementIteration();

    await app.updateCurrentTour(() => {
      const currentTour = tour.slice();
      move(currentTour, i, j);
      return currentTour;
    });

    if (d[tour[i - 1]][tour[j]] < costIns) {
      costIns = d[tour[i - 1]][tour[j]];
      nearest = j;
    }

    await app.sleep();
  }

  move(tour, i, nearest);
  length = app.helpers.matrixCost(d, tour);
  await app.updateBestTour(() => tour, length);
}

app.end();
