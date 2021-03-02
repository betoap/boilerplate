import { TranslateState } from './translate.state';

export interface AppState {
    status: string;
}

export const initialAppState = {
    status: 'off',
};

export interface AppStateUnion {
    app: AppState;
    languages: TranslateState;
}
