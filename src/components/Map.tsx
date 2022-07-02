import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from '@deck.gl/react/typed';
import { PathLayer, ScatterplotLayer } from '@deck.gl/layers/typed';
import { useAppState } from './AppContext';

// Doesn't have to be secret
const TOKEN =
  'pk.eyJ1Ijoicm9kYWtkIiwiYSI6ImNsNGJzZmt5cDBzMWszZG83MW1nNjUxZHIifQ.0XZS-LDfP7ikXWKE83tFqQ';

export const Map = () => {
  const { viewState, setViewState } = useAppState();

  return (
    <MapGL
      {...viewState}
      onMove={(e) => setViewState(e.viewState)}
      mapboxAccessToken={TOKEN}
      mapStyle='mapbox://styles/mapbox/light-v10'
    ></MapGL>
  );
};
