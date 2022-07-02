import { RunParams } from '~/types';

class RunnerClass {
  startRun(params: RunParams) {}
  pauseRun() {}
  stopRun() {}
  resumeRun() {}
}

export const Runner = new RunnerClass();
