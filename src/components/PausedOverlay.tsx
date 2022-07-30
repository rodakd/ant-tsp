import { ImPause2 } from 'react-icons/im';

export const PausedOverlay = () => {
  return (
    <div className='paused-overlay'>
      <div className='paused-overlay__text'>
        <ImPause2 size={40} />
        Paused
      </div>
    </div>
  );
};
