import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'; //返回一个柯里化函数，使action中可以异步操作
import rootReducer from './reducers';

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    applyMiddleware( thunk, loggerMiddleware )
)

export default store;
