import * as t from '~/types';

import { createContext, useContext, useState } from 'react';
import { INITIAL_VIEWSTATE } from '~/constants';
import { AVAILABLE_WORKERS, getWorkerDefaultParams, useWorker } from '~/workers';

type IAppContext = {
  status: t.AppStatus;
  startRun: () => void;
  pauseRun: () => void;
  resumeRun: () => void;
  stopRun: () => void;

  iteration: number;
  bestTour: number;
  setIteration: (iteration: number) => void;
  setBestTour: (tour: number) => void;

  viewState: t.ViewState;
  setViewState: (viewState: t.ViewState) => void;

  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;

  markers: t.Marker[];
  markerModeOn: boolean;
  setMarkers: (markers: t.Marker[]) => void;
  setMarkerModeOn: (markerModeOn: boolean) => void;

  params: t.ParamsState;
  setParams: (newParams: t.ParamsState) => void;

  selectedWorker: string;
  setSelectedWorker: (workerName: string) => void;
};

const AppContext = createContext({} as IAppContext);

type AppContextProviderProps = {
  children: JSX.Element;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [status, setStatus] = useState<t.AppStatus>('idle');

  const [iteration, setIteration] = useState(0);
  const [bestTour, setBestTour] = useState(0);

  const [viewState, setViewState] = useState<t.ViewState>(INITIAL_VIEWSTATE);
  const [markers, setMarkers] = useState<t.Marker[]>([]);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [markerModeOn, setMarkerModeOn] = useState(false);

  const [params, _setParams] = useState<t.ParamsState>(
    getWorkerDefaultParams(AVAILABLE_WORKERS['Ant Colony Optimization'])
  );
  const setParams = (newParams: t.ParamsState) => {
    _setParams((params) => ({ ...params, ...newParams }));
  };

  const [selectedWorker, _setSelectedWorker] = useState('Ant Colony Optimization');
  const setSelectedWorker = (workerName: string) => {
    const workerConfig = AVAILABLE_WORKERS[workerName];
    const defaultParams = getWorkerDefaultParams(workerConfig);
    _setParams(defaultParams);
    _setSelectedWorker(workerName);
  };

  const workerDispatch = useWorker(selectedWorker);

  const startRun = () => {
    if (status !== 'idle') {
      return;
    }

    setStatus('running');
    setMarkerModeOn(false);
    setSettingsOpen(false);
    workerDispatch({
      type: 'run',
      payload: params,
    });
  };

  const stopRun = () => {
    if (status === 'idle') {
      return;
    }

    setStatus('idle');
    workerDispatch({ type: 'stop' });
  };

  const pauseRun = () => {
    if (status !== 'running') {
      return;
    }

    setStatus('paused');
    workerDispatch({ type: 'pause' });
  };

  const resumeRun = () => {
    if (status !== 'paused') {
      return;
    }

    setStatus('running');
    workerDispatch({ type: 'resume' });
  };

  return (
    <AppContext.Provider
      value={{
        status,
        viewState,
        settingsOpen,
        params,
        markerModeOn,
        markers,
        iteration,
        bestTour,
        selectedWorker,
        setSelectedWorker,
        setParams,
        setIteration,
        setBestTour,
        setMarkers,
        setViewState,
        setMarkerModeOn,
        startRun,
        pauseRun,
        stopRun,
        resumeRun,
        setSettingsOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};
