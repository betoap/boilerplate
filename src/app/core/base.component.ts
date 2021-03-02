import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({template: ''})
export abstract class BaseComponent {

  private _unsubLanguage$: any = new Subject();
  public language: string = 'pt-br';
  static languageCurrent: string = 'pt-br';

  constructor(
    protected _translate: TranslateService,
    protected readonly _store: Store<any>
  ) {
    this._translate.setDefaultLang(this.language);
  }

  ngOnInit() {
    this._unsubLanguage$.unsubscribe();
    this._unsubLanguage$ = this
      ._store
      .pipe(
        select('languages'),
      )
      .subscribe( language => {
        if( this.language === language.language ) return;
        this._translate.use( language.language );
        this.language = language.language;
        BaseComponent.languageCurrent = language.language;
        this.load();
      });
  }

  ngOnDestroy(){
    this._unsubLanguage$.unsubscribe();
  }

  abstract load();

}
