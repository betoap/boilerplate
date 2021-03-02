import { TranslateState, initialTranslateState } from '../states';
import { TranslateAction, TranslateActions } from '../actions';

export function translateReducer (
  state = initialTranslateState,
  action: TranslateActions
): TranslateState {
  switch ( action.type ) {
    case TranslateAction.TRANSLATE:
      return {
        language: action.payload
      };
    default:
      return state;
  }
}
