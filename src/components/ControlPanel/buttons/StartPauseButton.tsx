import { IoMdPause } from 'react-icons/io';
import { IoCaretForwardCircleOutline } from 'react-icons/io5';
import { AppStatus } from '~/types';
import { PanelButton } from './PanelButton';

type Props = {
  status: AppStatus;
  disabled: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
};

export const StartPauseButton = ({ status, disabled, onStart, onPause, onResume }: Props) => {
  switch (status) {
    case 'idle':
      return (
        <PanelButton
          title='Start'
          disabled={disabled}
          icon={<IoCaretForwardCircleOutline size={20} />}
          onClick={onStart}
        />
      );
    case 'running':
      return <PanelButton title='Pause' icon={<IoMdPause size={15} />} onClick={onPause} />;
    case 'paused':
      return (
        <PanelButton
          title='Resume'
          icon={<IoCaretForwardCircleOutline size={20} />}
          onClick={onResume}
        />
      );
  }
};
