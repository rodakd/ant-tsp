import { All } from './datasets/All';
import { Capitals } from './datasets/Capitals';
import { PolandAll } from './datasets/PolandAll';
import { PolandTop10 } from './datasets/PolandTop10';
import { PolandTop50 } from './datasets/PolandTop50';
import { Ukraine } from './datasets/Ukraine';
import { UnitedStates } from './datasets/UnitedStates';
import { WorldTop1000 } from './datasets/WorldTop1000';
import { Dataset } from './types';

// Doesn't have to be secret
export const MAPBOX_TOKEN =
  'pk.eyJ1Ijoicm9kYWtkIiwiYSI6ImNsNGJzZmt5cDBzMWszZG83MW1nNjUxZHIifQ.0XZS-LDfP7ikXWKE83tFqQ';

export const BASE_DELAY_MS = 500;
export const DEFAULT_SPEED_PERCENT = 60;

export const POLAND_VIEWSTATE = {
  latitude: 52.3019155410081,
  longitude: 19.145622827342095,
  zoom: 5.431885792789866,
};

export const WORLD_VIEWSTATE = {
  latitude: 34.87322478158413,
  longitude: -30.854692483216354,
  zoom: 1.1125846432617081,
};

export const UKRAINE_VIEWSTATE = {
  latitude: 49.1455826364799,
  longitude: 30.50946939955952,
  zoom: 5.431885792789866,
};

export const US_VIEWSTATE = {
  latitude: 43.90254185874704,
  longitude: -124.02563542435257,
  zoom: 3.0375660647805325,
};

export const DATASETS: Dataset[] = [
  {
    name: `Poland Top (10)`,
    markers: PolandTop10,
    viewState: POLAND_VIEWSTATE,
  },
  {
    name: `Poland Top (50)`,
    markers: PolandTop50,
    viewState: POLAND_VIEWSTATE,
  },
  {
    name: `Capitals (${Capitals.length})`,
    markers: Capitals,
    viewState: WORLD_VIEWSTATE,
  },
  {
    name: `Poland (${PolandAll.length})`,
    markers: PolandAll,
    viewState: POLAND_VIEWSTATE,
  },
  {
    name: `Ukraine (${Ukraine.length})`,
    markers: Ukraine,
    viewState: UKRAINE_VIEWSTATE,
  },
  {
    name: `Top Population (${WorldTop1000.length})`,
    markers: WorldTop1000,
    viewState: WORLD_VIEWSTATE,
  },
  {
    name: `United States (${UnitedStates.length})`,
    markers: UnitedStates,
    viewState: US_VIEWSTATE,
  },
  {
    name: `World (${All.length})`,
    markers: All,
    viewState: WORLD_VIEWSTATE,
  },
];

export const DEFAULT_DATASET = DATASETS[0];

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
