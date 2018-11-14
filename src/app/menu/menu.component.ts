import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../_model';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() menu: Menu;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
