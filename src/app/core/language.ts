import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

function loadTranslateSite( http: HttpClient, files: Array<string> ) {
  const path: any = files.map( ( file: string )=> {
    return {
      prefix: `./assets/i18n/app/modules/site/${file}/`,
      suffix: '.json'
    }
  } );
  path.push({ prefix: './assets/i18n/app/modules/site/', suffix: '.json' });
  return new MultiTranslateHttpLoader(http, path);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function siteTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/app/modules/site/', '.json');
}
export function homeTranslateLoader(http: HttpClient) {
  return loadTranslateSite( http, ['home'] );
}
