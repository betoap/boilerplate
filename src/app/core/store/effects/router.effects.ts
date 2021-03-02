import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { RouterAction, Go } from '../actions';

import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(RouterAction.GO),
    map((action: Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
  .pipe(
      ofType(RouterAction.BACK),
      tap(() => {
      this.location.back();
    }));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
  .pipe(
      ofType(RouterAction.FORWARD),
      tap(() => {
      this.location.forward();
    }));
}
