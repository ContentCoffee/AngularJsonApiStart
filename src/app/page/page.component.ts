import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../_service';
import { Page } from '../_model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  uuid: string;
  page: Page;
  

  constructor(private api: ApiService, private route: ActivatedRoute) {
  
  }

  async ngOnInit() {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    this.page = new Page().deserialize(await this.api.fetchOneInclude('node', 'page', this.uuid, ['field_image']));
    console.log(this.page);
  }

}
