import { Action } from '@ngrx/store';

export enum Linguages {
  PT_BR = 'pt-br'
}

export enum TranslateAction {
  TRANSLATE = '[Translate] Change language'
}

export class ChangeLanguage implements Action {
  public readonly type = TranslateAction.TRANSLATE;
  public constructor ( public payload: Linguages ) { }
}

export type TranslateActions = ChangeLanguage;
