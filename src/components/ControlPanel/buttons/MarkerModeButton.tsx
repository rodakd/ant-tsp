import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { PanelButton } from './PanelButton';

type Props = {
  markerModeOn: boolean;
  setMarkerModeOn: (markerModeOn: boolean) => void;
  disabled?: boolean;
};

export const MarkerModeButton = ({ markerModeOn, setMarkerModeOn, disabled }: Props) => {
  if (markerModeOn) {
    return (
      <PanelButton
        title='Exit Marker Mode'
        icon={<IoMdCloseCircle size={20} />}
        onClick={() => setMarkerModeOn(false)}
        disabled={disabled}
      />
    );
  }

  return (
    <PanelButton
      title='Marker Mode'
      icon={<FaMapMarkerAlt size={15} />}
      onClick={() => setMarkerModeOn(true)}
      disabled={disabled}
    />
  );
};
