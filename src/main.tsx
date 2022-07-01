import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContainer } from '~/components/AppContainer';

import './styles/reset.scss';
import './styles/components.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
