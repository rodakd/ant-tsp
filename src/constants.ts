import * as t from '~/types';

// Doesn't have to be secret
export const MAPBOX_TOKEN =
  'pk.eyJ1Ijoicm9kYWtkIiwiYSI6ImNsNGJzZmt5cDBzMWszZG83MW1nNjUxZHIifQ.0XZS-LDfP7ikXWKE83tFqQ';

export const INITIAL_VIEWSTATE: t.ViewState = {
  latitude: 52.3019155410081,
  longitude: 19.145622827342095,
  zoom: 5.431885792789866,
};

export const PRESET_1: t.Preset = {
  viewState: {},
  markers: [],
};

export const PRESET_2: t.Preset = {
  viewState: {},
  markers: [],
};
