import { RunParams } from '~/types';

class RunnerClass {
  startRun(params: RunParams, onRunFinished: () => void) {}
  pauseRun() {}
  stopRun() {}
  resumeRun() {}
}

export const Runner = new RunnerClass();
