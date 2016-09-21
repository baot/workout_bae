import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';

import rootReducer from '../reducers/';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      // eslint-disable-next-line no-undef
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
