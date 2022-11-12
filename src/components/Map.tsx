import * as t from '~/types';

import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import { ScatterplotLayer, PathLayer } from '@deck.gl/layers/typed';
import { MAPBOX_TOKEN } from '~/constants';
import { useStore } from '~/store';
import { useMemo } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import { PickingInfo } from '@deck.gl/core/typed';

export const Map = () => {
  const viewState = useStore((state) => state.viewState);
  const markerModeOn = useStore((state) => state.markerModeOn);
  const markers = useStore((state) => state.markers);
  const bestTour = useStore((state) => state.bestTour);
  const status = useStore((state) => state.status);
  const currentTour = useStore((state) => state.currentTour);
  const performanceMode = useStore((state) => state.performanceMode);

  const setMarkers = useStore((state) => state.setMarkers);

  const addMarker = (info: PickingInfo) => {
    if (!markerModeOn || !info.coordinate) {
      return;
    }

    const newMarker: t.Marker = [info.coordinate[0], info.coordinate[1]];
    setMarkers([...markers, newMarker]);
  };

  const drawPath = !performanceMode || status !== 'running';

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
              color: [180, 180, 180, 180],
              path: currentTour,
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

  return (
    <DeckGL
      onClick={addMarker}
      initialViewState={viewState}
      layers={layers}
      controller={{ doubleClickZoom: false }}
    >
      <MapGL mapboxAccessToken={MAPBOX_TOKEN} mapStyle='mapbox://styles/mapbox/light-v10' />
    </DeckGL>
  );
};
