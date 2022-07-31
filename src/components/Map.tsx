import * as t from '~/types';

import MapGL, { MapLayerMouseEvent } from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import { ScatterplotLayer } from '@deck.gl/layers/typed';
import { useAppState } from './AppContext';
import { MAPBOX_TOKEN } from '~/constants';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Map = () => {
  const { viewState, markerModeOn, markers, mapRef, setViewState, setMarkers } = useAppState();

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
            getFillColor: () => {
              return [0, 173, 255];
            },
          }),
        ]}
      />
    </MapGL>
  );
};
