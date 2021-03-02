import { ActionReducerMap } from '@ngrx/store';
import { appReducer, translateReducer } from './reducers';
import { AppStateUnion } from './states/app.state';

export const AppReducers: ActionReducerMap<AppStateUnion> = {
    app: appReducer,
    languages: translateReducer
};
