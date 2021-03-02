import { Component } from '@angular/core';

/** RXJS **/
import { Subject } from 'rxjs';

/** NGRX **/
import { Store, select } from '@ngrx/store';
import { AppStateUnion } from './core/store/states';
import { AppStarted } from './core/store/actions';

/** I18N **/
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'am-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _unsub$: any = new Subject();

  title = 'boilerplate';

  constructor(
    private readonly _translate: TranslateService,
    private readonly _store: Store<AppStateUnion>
  ) {
    /** Set language default **/
    this._translate.setDefaultLang('pt-br');

    /** Start project **/
    this._store.dispatch( new AppStarted() );
  }

  ngOnInit() {
    this._unsub$ = this
      ._store
      .pipe(
        select('languages'),
      )
      .subscribe( language => {
        this._translate.use( language.language );
      });
  }

  ngOnDestroy(){
    this._unsub$.unsubscribe();
  }

}
