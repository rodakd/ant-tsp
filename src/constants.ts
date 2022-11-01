// Doesn't have to be secret
export const MAPBOX_TOKEN =
  'pk.eyJ1Ijoicm9kYWtkIiwiYSI6ImNsNGJzZmt5cDBzMWszZG83MW1nNjUxZHIifQ.0XZS-LDfP7ikXWKE83tFqQ';

export const BASE_DELAY_MS = 500;

export const DEFAULT_SPEED_PERCENT = 60;
export const DEFAULT_MULTI_RUN_LIMIT = 10;
export const DEFAULT_ITERATIONS_LIMIT = 100;
export const DEFAULT_MULTI_RUN_SUMMARY = {
  bestToursHistories: [],
};

export const DEFAULT_CUSTOM_CODE = `// The following is the code for 2-Opt algorithm

const tour = [...app.markers];
tour.push(tour[0]);
app.updateBestTour(tour);

let best = app.calculateCost(tour);
let swapped = true;
while (swapped) {
  swapped = false;
  for (let i = 1; i < tour.length - 1; i++) {
    for (let j = i + 1; j < tour.length - 1; j++) {
      app.updateIteration(app.iteration + 1);

      const section = tour.slice(i, j + 1);
      section.reverse();

      tour.splice(i, j + 1 - i, ...section);
      const newTour = tour;
      const newCost = app.calculateCost(newTour);

      app.updateCurrentTour([
        ...tour.slice(0, i),
        ...tour.slice(i + 1, j),
        ...tour.slice(j + 1),
        ...[tour[i - 1], tour[i], tour[i + 1]],
        ...[tour[j - 1], tour[j], tour[j + 1]],
      ]);

      await app.sleep();

      if (newCost < best) {
        swapped = true;
        best = newCost;
        app.log('New best: ' + best);
        app.updateBestTour(newTour);
      } else {
        section.reverse();
        tour.splice(i, j + 1 - i, ...section);
      }

      app.updateCurrentTour(tour);
      await app.sleep();
    }
  }
}

app.log('Ended with cost: ' + best);
app.end();
`;
