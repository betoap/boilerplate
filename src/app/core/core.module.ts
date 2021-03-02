import { NgModule, LOCALE_ID, Optional, SkipSelf } from '@angular/core';
import { registerLocaleData, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { environment } from './../../environments/environment';

/** HTTP **/
import { HttpClientModule, HttpClient } from '@angular/common/http';

/** I18N **/
import localePtBr from '@angular/common/locales/pt';
registerLocaleData(localePtBr, 'pt');

/** TRANSLATE **/
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './language';

/** DYNAMICCOMPONENT **/
import { DynamicComponentLoaderModule } from './../shared/dynamic-component-loader/dynamic-component-loader.module';

/** NGRX CONFIG **/
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/** NGRX STARTED */
import { AppEffects } from './store/effects/app.effects';
import { AppReducers } from './store/app.reducers';
import { metaReducers } from './store/localStorage.config';
import { CustomSerializer } from './store/serializers/router.serializer';

@NgModule({
  imports:[
    CommonModule,
    RouterModule,
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      // serialize: true
    }),
    StoreModule.forRoot( AppReducers, { metaReducers } ),
    EffectsModule.forRoot( AppEffects ),
    DynamicComponentLoaderModule,
    DynamicComponentLoaderModule.forRoot( [] ),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      },
      isolate: true
    }),
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    TranslateModule,
    DynamicComponentLoaderModule,
    StoreRouterConnectingModule,
    EffectsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
  ],
  entryComponents: [
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentMolule: CoreModule
  ) {
    if ( parentMolule ) {
      console.error(`O modulo ja foi carregado em outro modulo, utilize-o apenas no CoreModule`);
    }
  }
}
