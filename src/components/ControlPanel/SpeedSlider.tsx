import { Slider } from 'antd';
import { useStore } from '~/store';

export const SpeedSlider = () => {
  const speedPercent = useStore((state) => state.speedPercent);
  const setSpeed = useStore((state) => state.setSpeed);

  return (
    <div className='speed-slider'>
      <Slider value={speedPercent} onChange={setSpeed} />
    </div>
  );
};
