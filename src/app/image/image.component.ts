import { Component, Input, OnInit } from '@angular/core';
import { JsonApiEntity } from '../_model';
import { ApiService } from '../_service';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input('image') image: JsonApiEntity;
  @Input('width') width: number;
  @Input('height') height: number;

  constructor(private api: ApiService) { }
  ngOnInit() { }
}
