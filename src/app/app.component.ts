import { Component, OnInit } from '@angular/core';
import { ApiService } from './_service';
import { Menu } from './_model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  menu: Menu;
  
  constructor(private api: ApiService) { 

  }

  async ngOnInit() {
    this.menu = new Menu().deserialize(await this.api.fetchMany('menu_link_content', 'menu_link_content', '?filter[menu_name][value]=main&sort=weight'));
  }

}
