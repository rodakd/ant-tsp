import { IoMdSettings } from 'react-icons/io';
import { IoCaretUp } from 'react-icons/io5';
import { PanelButton } from './PanelButton';

type Props = {
  settingsOpen: boolean;
  onSetSettingsOpen: (open: boolean) => void;
  disabled?: boolean;
};

export const SettingsButton = ({ settingsOpen, onSetSettingsOpen, disabled }: Props) => {
  if (settingsOpen) {
    return (
      <PanelButton
        title='Hide Settings'
        icon={<IoCaretUp size={30} />}
        onClick={() => onSetSettingsOpen(false)}
        disabled={disabled}
      />
    );
  }

  return (
    <PanelButton
      title='Open Settings'
      icon={<IoMdSettings size={30} />}
      onClick={() => onSetSettingsOpen(true)}
      disabled={disabled}
    />
  );
};
