import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterAction {
  GO = '[Router] Go',
  BACK = '[Router] Back',
  FORWARD = '[Router] Forward'
}

export class Go implements Action {
  readonly type = RouterAction.GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = RouterAction.BACK;
}

export class Forward implements Action {
  readonly type = RouterAction.FORWARD;
}

export type RouterActions = Go | Back | Forward;
