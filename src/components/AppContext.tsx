import { Runner } from '~/lib/Runner';
import { createContext, useContext, useMemo, useState } from 'react';
import { AppStatus, RunParams } from '~/types';

type IAppContext = {
  status: AppStatus;

  settingsOpen: boolean;
  markerModeOn: boolean;

  setSettingsOpen: (open: boolean) => void;
  setMarkerModeOn: (markerModeOn: boolean) => void;

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
  const [status, setStatus] = useState<AppStatus>('idle');

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [markerModeOn, setMarkerModeOn] = useState(false);

  const [evaporation, setEvaporation] = useState(0.7);
  const [qParam, setQParam] = useState(100);
  const [alpha, setAlpha] = useState(1);
  const [beta, setBeta] = useState(5);
  const [percentOfAnts, setPercentOfAnts] = useState(80);
  const [iterations, setIterations] = useState(100);

  const startRun = () => {
    if (status !== 'idle') {
      return;
    }

    setStatus('running');
    Runner.startRun({
      evaporation,
      qParam,
      alpha,
      beta,
      percentOfAnts,
      iterations,
    });
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

  const stopRun = () => {
    if (status === 'idle') {
      return;
    }

    setStatus('idle');
    Runner.stopRun();
  };

  const memoizedContext: IAppContext = useMemo(
    () => ({
      status,
      settingsOpen,
      evaporation,
      qParam,
      alpha,
      beta,
      percentOfAnts,
      iterations,
      markerModeOn,
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
    }),
    [
      status,
      markerModeOn,
      settingsOpen,
      evaporation,
      qParam,
      alpha,
      beta,
      percentOfAnts,
      iterations,
      startRun,
      pauseRun,
      stopRun,
      resumeRun,
    ]
  );

  return <AppContext.Provider value={memoizedContext}>{children}</AppContext.Provider>;
};

export default function useAppState() {
  return useContext(AppContext);
}
