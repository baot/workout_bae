import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/configureStore';
import Root from './components/Root';

const store = configureStore({});
// create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
// https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away
injectTapEventPlugin();
const app = document.getElementById('app');

render(<Root store={store} history={history} />, app);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    render(
      <AppContainer>
        <Root store={store} history={history} />
      </AppContainer>, app);
  });
}
