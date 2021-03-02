import { NgModule } from '@angular/core';

import { SiteModule } from './../site.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { homeTranslateLoader } from './../../../core/language';
@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    SiteModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (homeTranslateLoader),
          deps: [HttpClient]
      },
      isolate: true
    }),
  ],
  exports: [
  ],
})
export class HomeModule { }
