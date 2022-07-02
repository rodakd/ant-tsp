import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContainer } from '~/components/AppContainer';
import { AppContextProvider } from './components/AppContext';

import './styles/reset.scss';
import 'antd/dist/antd.css';
import './styles/components.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <AppContainer />
    </AppContextProvider>
  </React.StrictMode>
);
