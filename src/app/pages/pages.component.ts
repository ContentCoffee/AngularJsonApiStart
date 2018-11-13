import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service';
import { JsonApiCollection } from '../_model';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  pages: JsonApiCollection;

  constructor(private api: ApiService) { }

  async ngOnInit() {
    this.pages = new JsonApiCollection().deserialize(await this.api.fetchMany('node', 'page', '?include=field_image'));
    console.log(this.pages);
  }

}
