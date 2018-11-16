import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  { path: '', redirectTo: 'en/pages/0', pathMatch: 'full' },
  { path: 'nl/paginas/:page', component: PagesComponent },
  { path: 'en/pages/:page', component: PagesComponent },
  
  { path: 'nl/pagina/:uuid', component: PageComponent },
  { path: 'en/page/:uuid', component: PageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}