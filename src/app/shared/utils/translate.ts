import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function translateLoaderAPP(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/app/', '.json');
}
export function translateLoaderAdmin(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/app/modules/admin/', '.json');
}
