import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ConfigService, ApiService, authService} from './_service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {JwtHelper} from 'node_modules/angular2-jwt/angular2-jwt';
import { PageComponent } from './page/page.component';
import { BrickComponent } from './brick/brick.component';
import { ImageComponent } from './image/image.component';
import { PagesComponent } from './pages/pages.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    BrickComponent,
    ImageComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    JwtHelper,
    authService,
    ConfigService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
