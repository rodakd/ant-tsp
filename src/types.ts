import { MapProps } from 'react-map-gl';

export type RunParams = {
  evaporation: number;
  qParam: number;
  alpha: number;
  beta: number;
  percentOfAnts: number;
  iterations: number;
};

export type AppStatus = 'running' | 'paused' | 'idle';

export type Marker = [number, number];

export type ViewState = Partial<MapProps['viewState']>;

export type Preset = {
  viewState: ViewState;
  markers: Marker[];
};
