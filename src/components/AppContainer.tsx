import { AppContextProvider } from './AppContext';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { Map } from './Map';

export const AppContainer = () => {
  return (
    <AppContextProvider>
      <div className='app-container'>
        <ControlPanel />
        <Map />
      </div>
    </AppContextProvider>
  );
};
