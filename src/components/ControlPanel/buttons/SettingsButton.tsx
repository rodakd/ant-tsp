import { IoMdSettings } from 'react-icons/io';
import { IoCaretUp } from 'react-icons/io5';
import { PanelButton } from './PanelButton';

type Props = {
  settingsOpen: boolean;
  onSetSettingsOpen: (open: boolean) => void;
};

export const SettingsButton = ({ settingsOpen, onSetSettingsOpen }: Props) => {
  if (settingsOpen) {
    return (
      <PanelButton
        title='Hide Settings'
        icon={<IoCaretUp size={30} />}
        onClick={() => onSetSettingsOpen(false)}
      />
    );
  }

  return (
    <PanelButton
      title='Open Settings'
      icon={<IoMdSettings size={30} />}
      onClick={() => onSetSettingsOpen(true)}
    />
  );
};
