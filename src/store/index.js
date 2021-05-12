import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';

import todo from './todo';

const rootReducer = combineReducers({
  todo,
});

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const store = createStore(rootReducer, bindMiddleware([]));

export default store;
