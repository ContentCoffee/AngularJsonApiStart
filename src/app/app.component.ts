import { Component, OnInit } from '@angular/core';
import { ApiService, ConfigService } from './_service';
import { Menu } from './_model';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router, private config: ConfigService, public meta: Meta, public title: Title) { 

  }

  get language() {
    //console.log(this.config.language);
    return this.config.language;
  }

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'loremippy' }); 
    this.title.setTitle('titties');
  }

  switchLanguage() {
    if (this.config.language == 'en') {
      this.config.language = 'nl';
    } else {
      this.config.language = 'en';
    }
  }

}




