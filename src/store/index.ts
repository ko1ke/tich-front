import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { currentUserReducer } from '../features/userSlice';
import { drawerReducer } from '../features/drawerSlice';
// import { currentUserReducer } from './modules/currentUser'

// Connected React Routerで共通のインスタンスを使用する
// 必要があるためエクスポートしておく
export const history = createBrowserHistory();

const reducer = combineReducers({
  router: connectRouter(history),
  drawer: drawerReducer,
  currentUser: currentUserReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(routerMiddleware(history));
  },
});
