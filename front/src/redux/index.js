import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas/';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  order: require('./orderRedux').reducer,
  photo: require('./photoRedux').reducer,
  credentials: require('./credentialsRedux').reducer,
});

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(
    reducers,
    rootSaga,
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  return store;
};
