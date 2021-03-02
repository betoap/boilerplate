import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { siteTranslateLoader } from './../../core/language';
import { SiteComponent } from './site.component';
import { SiteRoutingModule } from './site-routing.module';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';


@NgModule({
  declarations: [
    SiteComponent,
  ],
  imports: [
    SiteRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (siteTranslateLoader),
          deps: [HttpClient]
      },
      isolate: true
    }),
  ],
  exports: [
    SharedModule,
  ],
})
export class SiteModule { }
