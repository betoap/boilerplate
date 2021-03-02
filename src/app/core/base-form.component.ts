import { TranslateService } from '@ngx-translate/core';

import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FormComponent } from './../shared/utils';

export abstract class BaseFormComponent extends FormComponent {

  private _unsubLanguage$: any = new Subject();
  protected language: string = 'pt-br';

  constructor(
    private _translate: TranslateService,
    private readonly _store: Store<any>
  ) {
    super();
    this._translate.setDefaultLang('pt-br');
  }

  ngOnInit() {
    this._unsubLanguage$ = this
      ._store
      .pipe(
        select('languages'),
      )
      .subscribe( language => {
        if( this.language === language.language ) return;
        this._translate.use( language.language );
        this.language = language.language;
        this.load();
      });
  }

  load(){}

  ngOnDestroy(){
    this._unsubLanguage$.unsubscribe();
  }



  getLanguageId( language ) {
    switch (language) {
      case 'pt-br':
        return 1;
      case 'en':
        return 2;
      case 'fr':
        return 3;
      case 'es':
        return 4;
      default:
        return 1;
    }
  }

}
