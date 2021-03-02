import { SiteComponent } from './site.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SiteComponent, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import( './home/home.module' ).then( m => m.HomeModule ) },
    { path: 'sobre', loadChildren: () => import( './about/about.module' ).then( m => m.AboutModule ) },
    { path: '**', redirectTo: '404', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
