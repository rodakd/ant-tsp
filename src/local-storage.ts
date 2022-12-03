import { z } from 'zod';

export const STORAGE_KEY = 'storage';
export const STORAGE_SCHEMA = z
  .object({
    hidePath: z.boolean(),
    hideChart: z.boolean(),
    multiRunMode: z.boolean(),
    datasetsOpen: z.boolean(),
    sateliteMode: z.boolean(),
    performanceMode: z.boolean(),
    multiRunLimit: z.number().int(),
    iterationsLimitMode: z.boolean(),
    iterationsLimit: z.number().int(),
    speedPercent: z.number().int(),
  })
  .partial()
  .strict();

export const mergeWithStorage = (obj: object) => {
  const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const newStorage = { ...storage, ...obj };
  const validatedStorage = STORAGE_SCHEMA.parse(newStorage);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(validatedStorage));
};

export const loadStorage = () => {
  try {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (Object.keys(storage).length > 0) {
      console.log('Loading storage: ', storage);
    }
    const validatedStorage = STORAGE_SCHEMA.parse(storage);
    return validatedStorage;
  } catch (err) {
    console.error(err);
    localStorage.setItem(STORAGE_KEY, '{}');
    return {};
  }
};
