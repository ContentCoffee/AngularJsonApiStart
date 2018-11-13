import { Component, OnInit } from '@angular/core';
import { ApiService } from './_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  

  constructor(private api: ApiService) { 

  }

  ngOnInit() {
    
  }

}
