import { Action } from '@ngrx/store';

export enum AppAction {
  APP_STARTED = '[App] App Started',
  APP_STATUS_RENDER = '[App] Status Render',
}

export class AppStarted implements Action {
  readonly type = AppAction.APP_STARTED;
}


export type AppActions = AppStarted;
