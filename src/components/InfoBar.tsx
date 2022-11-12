import { useStore } from '~/store';

export const InfoBar = () => {
  const markersCount = useStore((state) => state.markers.length);
  return <div className='info-bar'>Cities: {markersCount}</div>;
};
