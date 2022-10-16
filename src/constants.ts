import * as t from '~/types';

// Doesn't have to be secret
export const MAPBOX_TOKEN =
  'pk.eyJ1Ijoicm9kYWtkIiwiYSI6ImNsNGJzZmt5cDBzMWszZG83MW1nNjUxZHIifQ.0XZS-LDfP7ikXWKE83tFqQ';

export const PRESET_1: t.Preset = {
  viewState: {
    latitude: 52.3019155410081,
    longitude: 19.145622827342095,
    zoom: 5.431885792789866,
  },
  markers: [
    [14.539789034827947, 53.40170929413944],
    [16.93050692925766, 52.37810623502682],
    [17.992045955013793, 53.0953453679779],
    [21.000717101404575, 52.19731861471388],
    [19.93096283692651, 50.03638006235522],
    [23.161452565037024, 53.095659221543116],
    [17.031281451436655, 51.080470797550674],
    [19.019454327040478, 50.22542418940154],
    [19.10835867396557, 50.75972724648943],
    [22.572303035130744, 51.20759330066909],
    [20.48244515804015, 53.74277838875716],
  ],
};

export const PRESET_2: t.Preset = {
  viewState: {
    longitude: 11.883399991290958,
    latitude: 24.183034769166625,
    zoom: 1.171945176612675,
  },
  markers: [
    [-73.94406841946886, 40.87682458524361],
    [-3.680839417470338, 40.26766287218223],
    [12.50699405950428, 41.74659792073635],
    [8.69826247151579, 50.048706704424404],
    [21.05628410614787, 52.1632603539862],
    [-8.10666062163682, 12.462298263038889],
    [-43.12173931446392, -23.051435584190187],
    [-80.17155545542686, 25.663763097292488],
    [114.27406173592539, 22.082369313824344],
  ],
};

export const BASE_DELAY_MS = 500;
export const DEFAULT_SPEED_PERCENT = 60;
export const DEFAULT_CUSTOM_CODE = `// This is the code for 2-Opt algorithm

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

app.log('Found best tour of cost: ' + best);
app.finish();
`;
