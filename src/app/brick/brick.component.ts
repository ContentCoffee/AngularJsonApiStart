import { Component, Input, OnInit } from '@angular/core';
import { JsonApiEntity } from '../_model';
import { isArray } from 'rxjs/internal/util/isArray';

@Component({
  selector: 'brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.css']
})
export class BrickComponent implements OnInit {
  @Input('brick') brick: JsonApiEntity;
  constructor() { }
  ngOnInit() { }
}
