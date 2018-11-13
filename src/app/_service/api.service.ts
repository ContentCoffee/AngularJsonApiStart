import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { authService } from './auth.service';
import { ConfigService } from './config.service';
import { Entity, JsonApiCollection, JsonApiEntity } from '../_model';
import { resolve } from 'url';
import { mapToExpression } from '@angular/compiler/src/render3/view/util';

@Injectable()
export class ApiService {

    baseUrl = 'reset this in the constructor?';

    constructor(private config: ConfigService, private auth: authService, private http: HttpClient) {
      //this.auth.logout();  
      this.baseUrl = this.config.drupalServer + this.config.jsonApiPath;
    }

    // Build up some standard headers for when making a call.
    private buildHttpHeaders() {
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/json');
        headers = headers.append('Cache-Control', 'no-cache');
        //headers = headers.append('Authorization', 'Bearer ' + this.auth.token);
        return headers;
    }


    // Make a request.
    private async makeRequest(protocol:string, url:string, body:any = {}):Promise<any> { 
      
      // First, look if we are authenticated.
      // const authed = await this.auth.login().catch(rejected => {
      //   return new Promise((resolve, reject) => {
      //     reject('auth problems');
      //   });
      // });
 
      // Make the call!
      return this.http.request(protocol.toUpperCase(), url, {
        body: body,
        headers: this.buildHttpHeaders()
      }).toPromise().catch(reason => {
        console.log(reason);
      });

    }

    async fetchOne(type: string, bundle:string, uuid:string, params:string = ''):Promise<JsonApiEntity> {
      let u = this.baseUrl + type + '/' + bundle + '/' + uuid + params;
      const response = await this.makeRequest('get', u);
      return new JsonApiEntity().deserialize(response);
    }

    fetchOneInclude(type: string, bundle:string, uuid:string, includes: string[] = []):Promise<JsonApiEntity> {
      let params = '?include=' + includes.join(',');
      return this.fetchOne(type, bundle, uuid, params);
    }

    async fetchMany(type: string, bundle: string, params: string = ''):Promise<JsonApiCollection> {
      let u = this.baseUrl + type + '/' + bundle + params;
      const response = await this.makeRequest('get', u, {});
      return new JsonApiCollection().deserialize(response);
    }
     
    fetchTerms(vocabulary: string, parent: string = '0'):Promise<JsonApiCollection> {
      let parms = '?filter[parent]='+parent+'&sort=weight';
      if (parent != '0') {
        parms = '?filter[deparent][condition][path]=parent.uuid&filter[deparent][condition][operator]=%3D&filter[deparent][condition][value]='+parent+'&sort=weight';
      }
      return this.fetchMany('taxonomy_term', vocabulary, parms);
    }

    update(entity: JsonApiEntity) {
      let parts = entity.data.type.split('--');
      let u = this.baseUrl + parts[0] + '/' + parts[1] + '/' + entity.data.id;
      return this.makeRequest('patch', u, entity);
    }

    create(entity: JsonApiEntity) {
      let parts = entity.data.type.split('--');
      let u = this.baseUrl + parts[0] + '/' + parts[1];
      return this.makeRequest('post', u, entity);
    }

    delete(entity: JsonApiEntity) {
      let parts = entity.data.type.split('--');
      let u = this.baseUrl + parts[0] + '/' + parts[1] + '/' + entity.data.id;
      return this.makeRequest('delete', u);
    }

    deleteEntity(entity: Entity) {
      let parts = entity.type.split('--');
      let u = this.baseUrl + parts[0] + '/' + parts[1] + '/' + entity.id;
      return this.makeRequest('delete', u);
    }

    async getContent(host: number, hostType: string, container: string, language: string) {
      let brickTypes = await this.fetchMany('brick_type', 'brick_type');
      console.log(host);

      let bricks: Array<Entity> = [];
      for (const brickType of brickTypes.data) {
        let bricksOfType = await this.fetchMany('brick', brickType.attributes.type, 
          '?filter[content_parent_type]=' + hostType + 
          '&filter[langcode]=' + language + 
          '&filter[content_container]=' + container + 
          '&filter[content_parent]=' + host)
          .then(bricksOfType => {
          bricksOfType.data.forEach(brick => {
            bricks.push(brick);
          });
        });
      }
      
      bricks = bricks.sort(function(a, b){
        return a.attributes.content_weight - b.attributes.content_weight;
      });

      return bricks;
    }
}