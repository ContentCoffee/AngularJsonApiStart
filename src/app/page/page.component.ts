import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../_service';
import { Page } from '../_model';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  @Input('uuid') uuid: string;

  page: Page;
  

  constructor(private api: ApiService) {
  
  }

  async ngOnInit() {
    this.page = new Page().deserialize(await this.api.fetchOneInclude('node', 'page', this.uuid, ['field_image']));
    console.log(this.page);
  }

}
