// @flow

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { initialState } from './state';
import type { Store, Question } from './state';

class StoreProvider {
    static init = (): Store => {
        const middleware = applyMiddleware(thunk);

        const store = createStore(reducers, initialState, middleware);
        return store;
    };
}

export default StoreProvider;
