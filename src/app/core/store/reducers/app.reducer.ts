import { AppState, initialAppState } from '../states';
import { AppAction, AppActions } from '../actions';

export function appReducer( state = initialAppState, action: AppActions ): AppState {
  switch ( action.type ) {
    case AppAction.APP_STARTED:
      return {
        ...state,
        status: AppAction.APP_STARTED
      };
    default:
      return state;
  }
}
