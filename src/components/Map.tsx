import * as t from '~/types';

import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import { ScatterplotLayer, PathLayer } from '@deck.gl/layers/typed';
import { MAPBOX_TOKEN } from '~/constants';
import { useStore } from '~/store';
import { useMemo } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import { PickingInfo } from '@deck.gl/core/typed';

const controller = { doubleClickZoom: false };

export const Map = () => {
  const trail = useStore((state) => state.trail);
  const status = useStore((state) => state.status);
  const markers = useStore((state) => state.markers);
  const bestTour = useStore((state) => state.bestTour);
  const hidePath = useStore((state) => state.hidePath);
  const viewState = useStore((state) => state.viewState);
  const currentTour = useStore((state) => state.currentTour);
  const sateliteMode = useStore((state) => state.sateliteMode);
  const markerModeOn = useStore((state) => state.markerModeOn);
  const performanceMode = useStore((state) => state.performanceMode);

  const setMarkers = useStore((state) => state.setMarkers);

  const addMarker = (info: PickingInfo) => {
    if (!markerModeOn || !info.coordinate) {
      return;
    }

    const newMarker: t.Marker = [info.coordinate[0], info.coordinate[1]];
    setMarkers([...markers, newMarker]);
  };

  const isDrawingPath = () => {
    if (performanceMode) {
      return status !== 'running' && !hidePath;
    }
    return !hidePath;
  };

  const drawPath = isDrawingPath();

  const layers = useMemo(() => {
    return [
      new ScatterplotLayer({
        id: 'scatterplot',
        data: markers.map((m) => ({ position: m })),
        radiusMinPixels: 7,
        radiusMaxPixels: 7,
        getFillColor: [0, 173, 255],
      }),
      drawPath &&
        new PathLayer({
          id: 'path-layer',
          data: [
            {
              name: 'Current',
              color: [180, 180, 180],
              path: currentTour,
            },
            {
              name: 'Trail',
              color: [252, 186, 3],
              path: trail,
            },
            {
              name: 'Best',
              color: [24, 178, 188],
              path: bestTour,
            },
          ],
          getColor: (d) => d.color,
          widthMinPixels: 3,
          widthMaxPixels: 9,
        }),
    ];
  }, [markers, drawPath, currentTour, bestTour]);

  const mapStyle = sateliteMode
    ? 'mapbox://styles/mapbox/satellite-v9'
    : 'mapbox://styles/mapbox/light-v10';

  return (
    <DeckGL
      onClick={addMarker}
      initialViewState={viewState}
      layers={layers}
      controller={controller}
    >
      <MapGL key={mapStyle} mapboxAccessToken={MAPBOX_TOKEN} mapStyle={mapStyle} />
    </DeckGL>
  );
};
