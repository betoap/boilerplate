import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'disabled',
  scrollPositionRestoration: 'top',
  enableTracing: false,
};

const routes: Routes = [
  // { path: 'admin', loadChildren: () => import( './modules/admin/admin.module' ).then( m => m.AdminModule ) },
  { path: '', loadChildren: () => import( './modules/site/site.module' ).then( m => m.SiteModule ) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
