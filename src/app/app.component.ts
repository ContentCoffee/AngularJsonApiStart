import { Component, OnInit } from '@angular/core';
import { ApiService } from './_service';
import { Menu } from './_model';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private api: ApiService,public meta: Meta, public title: Title) { 

  }

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'loremippy' }); 
    this.title.setTitle('titties');    
  }

}




