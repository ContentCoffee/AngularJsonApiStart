import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  returnTo: string;

  constructor(private route: ActivatedRoute, private router: Router) {

   }

  ngOnInit() {
    this.route.queryParams.subscribe( params => 
    {
      this.returnTo = params.returnTo;
    });
  }
  onClick() {
    this.router.navigate([this.returnTo]);
  }

}
