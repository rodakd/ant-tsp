import { Runner } from '~/lib/Runner';
import { createContext, useContext, useState } from 'react';
import { AppStatus, RunParams } from '~/types';
import { MapLayerMouseEvent, MapProps } from 'react-map-gl';

type ViewState = Partial<MapProps['viewState']>;
type Marker = [number, number];

const INITIAL_VIEWSTATE: ViewState = {
  latitude: 52.3019155410081,
  longitude: 19.145622827342095,
  zoom: 5.431885792789866,
};

type IAppContext = {
  status: AppStatus;

  viewState: ViewState;
  setViewState: (viewState: ViewState) => void;

  settingsOpen: boolean;
  markerModeOn: boolean;
  setSettingsOpen: (open: boolean) => void;
  setMarkerModeOn: (markerModeOn: boolean) => void;

  markers: Marker[];
  addMarker: MapProps['onClick'];
  resetMarkers: () => void;

  startRun: () => void;
  pauseRun: () => void;
  resumeRun: () => void;
  stopRun: () => void;

  setEvaporation: (evaporation: number) => void;
  setQParam: (qParam: number) => void;
  setAlpha: (alpha: number) => void;
  setBeta: (beta: number) => void;
  setPercentOfAnts: (percentOfAnts: number) => void;
  setIterations: (iterations: number) => void;
} & RunParams;

const AppContext = createContext({}) as unknown as React.Context<IAppContext>;

type AppContextProviderProps = {
  children: JSX.Element;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEWSTATE);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [status, setStatus] = useState<AppStatus>('idle');

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [markerModeOn, setMarkerModeOn] = useState(false);

  const [evaporation, setEvaporation] = useState(0.7);
  const [qParam, setQParam] = useState(100);
  const [alpha, setAlpha] = useState(1);
  const [beta, setBeta] = useState(5);
  const [percentOfAnts, setPercentOfAnts] = useState(80);
  const [iterations, setIterations] = useState(100);

  const stopRun = () => {
    if (status === 'idle') {
      return;
    }

    setStatus('idle');
    Runner.stopRun();
  };

  const startRun = () => {
    if (status !== 'idle') {
      return;
    }

    setStatus('running');
    Runner.startRun(
      {
        evaporation,
        qParam,
        alpha,
        beta,
        percentOfAnts,
        iterations,
      },
      stopRun
    );
  };

  const pauseRun = () => {
    if (status !== 'running') {
      return;
    }

    setStatus('paused');
    Runner.pauseRun();
  };

  const resumeRun = () => {
    if (status !== 'paused') {
      return;
    }

    setStatus('running');
    Runner.resumeRun();
  };

  const addMarker = ({ lngLat }: MapLayerMouseEvent) => {
    const newMarker: Marker = [lngLat.lng, lngLat.lat];
    setMarkers([...markers, newMarker]);
  };

  const resetMarkers = () => {
    setMarkers([]);
  };

  return (
    <AppContext.Provider
      value={{
        status,
        viewState,
        settingsOpen,
        evaporation,
        qParam,
        alpha,
        beta,
        percentOfAnts,
        iterations,
        markerModeOn,
        markers,
        addMarker,
        resetMarkers,
        setViewState,
        setMarkerModeOn,
        startRun,
        pauseRun,
        stopRun,
        resumeRun,
        setEvaporation,
        setSettingsOpen,
        setQParam,
        setAlpha,
        setBeta,
        setPercentOfAnts,
        setIterations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};
