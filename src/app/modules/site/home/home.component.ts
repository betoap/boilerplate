import {
  Component,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';

import { AppStateUnion } from './../../../core/store/states';

declare const window: any;
declare const $: any;

@Component({
  selector: 'am-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _unsub$: any = new Subject();

  constructor(
    private _translate: TranslateService,
    private readonly _store: Store<AppStateUnion>,
  ){
    this._translate.setDefaultLang('pt-br');
  }

  ngOnInit(){}

  ngOnDestroy(){
    this._unsub$.unsubscribe();
  }

}
