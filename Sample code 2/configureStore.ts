import { Store, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ApplicationState, rootReducer, initApplicationState } from "./store";
import rootSaga from "./saga";

export function configureStore(
  initialState: ApplicationState
): Store<ApplicationState | any> {
  
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});
  
  //create the redux-saga middleware
  const sagaMiddleware = createSagaMiddleware()

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    rootReducer,
    initialState as any,
    // composeEnhancers()
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore(initApplicationState());
