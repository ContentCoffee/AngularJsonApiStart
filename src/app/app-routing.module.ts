import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  { path: '', redirectTo: '/pages/0', pathMatch: 'full' },
  { path: 'pages/:page', component: PagesComponent },
  { path: 'pages', redirectTo: '/pages/0', pathMatch: 'full'},
  { path: 'page/:uuid', component: PageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}