import * as t from '~/types';

import MapGL, { MapLayerMouseEvent, MapRef } from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import { ScatterplotLayer, PathLayer } from '@deck.gl/layers/typed';
import { MAPBOX_TOKEN } from '~/constants';
import { useStore } from '~/store';
import { MutableRefObject } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

type Props = {
  mapRef: MutableRefObject<MapRef | null>;
};

export const Map = ({ mapRef }: Props) => {
  const viewState = useStore((state) => state.viewState);
  const markerModeOn = useStore((state) => state.markerModeOn);
  const markers = useStore((state) => state.markers);
  const bestTour = useStore((state) => state.bestTour);
  const currentTour = useStore((state) => state.currentTour);
  const setViewState = useStore((state) => state.setViewState);
  const setMarkers = useStore((state) => state.setMarkers);

  const addMarker = ({ lngLat }: MapLayerMouseEvent) => {
    const newMarker: t.Marker = [lngLat.lng, lngLat.lat];
    setMarkers([...markers, newMarker]);
  };

  return (
    <MapGL
      {...viewState}
      ref={mapRef}
      onMove={(e) => setViewState(e.viewState)}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle='mapbox://styles/mapbox/light-v10'
      onClick={markerModeOn ? addMarker : undefined}
    >
      <DeckGL
        viewState={viewState}
        layers={[
          new ScatterplotLayer({
            id: 'scatterplot',
            data: markers.map((m) => ({ position: m })),
            radiusMinPixels: 7,
            radiusMaxPixels: 7,
            getFillColor: [0, 173, 255],
          }),
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
        ]}
      />
    </MapGL>
  );
};
