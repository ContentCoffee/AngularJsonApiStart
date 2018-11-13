import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service';
import { JsonApiCollection } from '../_model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  pages: JsonApiCollection;
  limit: number = 10;
  totalPages: number = 0;
  currentPage: number = -1;
  pageNumbers: Array<number> = [];

  constructor(private api: ApiService, private route: ActivatedRoute) { 
    console.log(this);
  }

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
    console.log(params);
    this.pages = await this.api.fetchMany('node', 'page', params);
    this.totalPages = Math.ceil( this.pages.meta.count / this.limit );
    this.pageNumbers = [];
    for ( let i = 0; i < this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }
  

}
