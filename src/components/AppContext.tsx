import * as t from '~/types';

import { createContext, useContext, useState } from 'react';
import { INITIAL_VIEWSTATE } from '~/constants';

type IAppContext = {
  status: t.AppStatus;
  startRun: () => void;
  pauseRun: () => void;
  resumeRun: () => void;
  stopRun: () => void;

  viewState: t.ViewState;
  setViewState: (viewState: t.ViewState) => void;

  settingsOpen: boolean;
  markerModeOn: boolean;
  setSettingsOpen: (open: boolean) => void;
  setMarkerModeOn: (markerModeOn: boolean) => void;

  markers: t.Marker[];
  setMarkers: (markers: t.Marker[]) => void;

  setEvaporation: (evaporation: number) => void;
  setQParam: (qParam: number) => void;
  setAlpha: (alpha: number) => void;
  setBeta: (beta: number) => void;
  setPercentOfAnts: (percentOfAnts: number) => void;
  setIterations: (iterations: number) => void;
} & t.RunParams;

const AppContext = createContext({} as IAppContext);

type AppContextProviderProps = {
  children: JSX.Element;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [viewState, setViewState] = useState<t.ViewState>(INITIAL_VIEWSTATE);
  const [markers, setMarkers] = useState<t.Marker[]>([]);
  const [status, setStatus] = useState<t.AppStatus>('idle');

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
  };

  const startRun = () => {
    if (status !== 'idle') {
      return;
    }
    setStatus('running');
    setMarkerModeOn(false);
    setSettingsOpen(false);
  };

  const pauseRun = () => {
    if (status !== 'running') {
      return;
    }
    setStatus('paused');
  };

  const resumeRun = () => {
    if (status !== 'paused') {
      return;
    }
    setStatus('running');
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
        setMarkers,
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
