/* @flow weak */
import configureDeps from './configureDeps';
import configureEpics from './configureEpics';
import createLoggerMiddleware from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

// Like redux-thunk, but with just one argument.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action,
  );


// Like redux-promise-middleware but simpler.
const promiseMiddleware = options => ({ dispatch }) => next => action => {
  const { shouldThrow } = options || {};
  const { payload } = action;
  const payloadIsPromise = payload && typeof payload.then === 'function';
  if (!payloadIsPromise) return next(action);
  const createAction = (suffix, payload) => ({
    type: `${action.type}_${suffix}`, meta: { action }, payload,
  });
  // Note we don't return promise.
  // github.com/este/este/issues/1091
  payload
    .then(value => dispatch(createAction('SUCCESS', value)))
    .catch(error => {
      dispatch(createAction('ERROR', error));
      // Not all errors need to be reported.
      if (shouldThrow(error)) {
        throw error;
      }
    });
  return next(createAction('START'));
};

const configureMiddleware = (initialState, platformDeps, platformMiddleware) => {
  const deps = configureDeps(initialState, platformDeps);
  const rootEpic = configureEpics(deps);
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const middleware = [
    injectMiddleware(deps),
    promiseMiddleware({
      shouldThrow: error => !errorToMessage(error),
    }),
    epicMiddleware,
    ...platformMiddleware,
  ];

  const enableLogger = process.env.NODE_ENV !== 'production' && (
    process.env.IS_BROWSER || initialState.device.isReactNative
  );

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const logger = createLoggerMiddleware({
      collapsed: true,
    });
    middleware.push(logger);
  }

  if (module.hot && typeof module.hot.accept === 'function') {
    if (initialState.device.isReactNative) {
      module.hot.accept(() => {
        const configureEpics = require('./configureEpics').default;

        epicMiddleware.replaceEpic(configureEpics(deps));
      });
    } else {
      module.hot.accept('./configureEpics', () => {
        const configureEpics = require('./configureEpics').default;

        epicMiddleware.replaceEpic(configureEpics(deps));
      });
    }
  }

  return middleware;
};

export default configureMiddleware;
