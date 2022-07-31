import { MapProps } from 'react-map-gl';

export type AppStatus = 'running' | 'paused' | 'idle';

export type Marker = [number, number];

export type ViewState = Partial<MapProps['viewState']>;

export type Preset = {
  viewState: ViewState;
  markers: Marker[];
};

export type ParamsState = Record<string, any>;
