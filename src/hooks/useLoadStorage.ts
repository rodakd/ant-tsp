import { useEffect } from 'react';
import { useStore } from '~/store';

export function useLoadStorage() {
  const loadStorage = useStore((state) => state.loadStorage);

  useEffect(() => {
    loadStorage();
  }, []);
}
