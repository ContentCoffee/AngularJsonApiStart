import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../_model';
import { ApiService } from '../_service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: Menu;
  @Input() name: string;

  constructor(private api: ApiService) { }

  async ngOnInit() {
    this.menu = new Menu().deserialize(await this.api.fetchMany('menu_link_content', 'menu_link_content', '?filter[menu_name][value]='+this.name+'&sort=weight'));
  }

}
