import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { JwtHelper } from 'node_modules/angular2-jwt/angular2-jwt';
import { ConfigService } from './config.service';
import { JwtToken } from '../_model';

@Injectable()
export class authService {

  TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private jwtHelper: JwtHelper, private configService: ConfigService) { }

  get token() {
      return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    
      return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
      localStorage.removeItem(this.TOKEN_KEY);
  }

  tokenNotExpired() {
    return this.token != null && !this.jwtHelper.isTokenExpired(this.token);
  }

  tokenIsExpired() {
    return this.token == null || this.jwtHelper.isTokenExpired(this.token);
  }

  login() {
    let promise = new Promise((resolve, reject)=>{
      if (!this.isAuthenticated || this.tokenIsExpired()) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/json');
        headers = headers.append('Cache-Control', 'no-cache');
        headers = headers.append('Authorization', 'Basic ' + btoa(this.configService.user+":"+this.configService.password));
        const httpOptions = {
          headers: headers
        };
        let url = this.configService.drupalServer + '/jwt/token';
        this.http.get(url, httpOptions).toPromise().then(
          (result:JwtToken) => {
            localStorage.setItem(this.TOKEN_KEY, result.token);
            resolve(this.token);
          },
          error => {
            localStorage.setItem(this.TOKEN_KEY, '');
            reject(false);
          }
        );
      } else {
        resolve(this.token);
      }
    });
    return promise;
  }
}