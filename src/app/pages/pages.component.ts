import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service';
import { JsonApiCollection, JsonApiEntity } from '../_model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  pagesContent: any;
  pages: JsonApiCollection;
  limit: number = 8;
  totalPages: number = 0;
  currentPage: number = -1;
  pageNumbers: Array<number> = [];

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  async ngOnInit() {  
    this.route.params.subscribe( params => 
      {
        if (params["page"] != this.currentPage) {
          this.currentPage = +params["page"];
          this.loadUp();
        }
      });
  }


  async loadUp() {
    let params = '?include=field_image&page[offset]='+(this.currentPage * this.limit)+'&page[limit]=' + this.limit;
    this.pages = await this.api.fetchMany('node', 'page', params);
    this.pagesContent = await this.api.fetchMany('node', 'pages');
    this.pagesContent = this.pagesContent.data.pop();

    this.totalPages = Math.ceil( this.pages.meta.count / this.limit );
    this.pageNumbers = [];
    for ( let i = 0; i < this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }
  

}
