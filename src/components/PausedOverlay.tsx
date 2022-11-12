import { ImPause2 } from 'react-icons/im';
import { useStore } from '~/store';

export const PausedOverlay = () => {
  const status = useStore((state) => state.status);

  if (status !== 'paused') {
    return null;
  }

  return (
    <div className='paused-overlay'>
      <div className='paused-overlay__text'>
        <ImPause2 size={40} />
        Paused
      </div>
    </div>
  );
};
