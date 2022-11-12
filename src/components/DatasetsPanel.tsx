import cn from 'classnames';

import { notification } from 'antd';
import { MutableRefObject } from 'react';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import { BiLockAlt } from 'react-icons/bi';
import { FaFileUpload } from 'react-icons/fa';
import { parseStringToMarkers, uploadFile } from '~/helpers';
import { useStore } from '~/store';
import { Dataset } from '~/types';
import { WORLD_VIEWSTATE } from '~/datasets/viewstates';
import { DATASETS } from '~/datasets';
import { FlyToInterpolator } from '@deck.gl/core/typed';

export const DatasetsPanel = () => {
  const status = useStore((state) => state.status);
  const datasetsOpen = useStore((state) => state.datasetsOpen);
  const setMarkers = useStore((state) => state.setMarkers);
  const setDatasetsOpen = useStore((state) => state.setDatasetsOpen);
  const setViewState = useStore((state) => state.setViewState);

  const importMarkers = async () => {
    const str = await uploadFile();
    if (!str) {
      return;
    }

    try {
      const markers = parseStringToMarkers(str);
      setMarkers(markers);

      const { longitude, latitude, zoom } = WORLD_VIEWSTATE;

      setViewState({
        longitude,
        latitude,
        zoom,
        transitionDuration: 'auto',
        transitionInterpolator: new FlyToInterpolator({ speed: 1.5 }),
      });
    } catch (err) {
      notification.error({ message: 'An error occurred', description: "Couldn't parse the file" });
    }
  };

  const setDataset = (ds: Dataset) => {
    if (status !== 'idle') {
      return;
    }

    setMarkers(ds.markers);

    const { longitude, latitude, zoom } = ds.viewState;
    if (longitude && latitude) {
      setViewState({
        longitude,
        latitude,
        zoom,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  };

  const getBtnIcon = () => {
    if (status !== 'idle') {
      return <BiLockAlt size={14} />;
    }

    if (datasetsOpen) {
      return <BsChevronUp size={14} />;
    }

    return <BsChevronDown size={14} />;
  };

  return (
    <>
      <button
        className='datasets__btn'
        onClick={() => {
          if (status === 'idle') {
            setDatasetsOpen(!datasetsOpen);
          }
        }}
      >
        Cities {getBtnIcon()}
      </button>
      <div className={cn('datasets', { 'datasets--open': datasetsOpen })}>
        {DATASETS.map((ds, idx) => (
          <button key={idx} className='datasets__item' onClick={() => setDataset(ds)}>
            {ds.name}
          </button>
        ))}
        <button onClick={importMarkers} className='datasets__item datasets__item--upload'>
          <FaFileUpload />
          Upload
        </button>
      </div>
    </>
  );
};
