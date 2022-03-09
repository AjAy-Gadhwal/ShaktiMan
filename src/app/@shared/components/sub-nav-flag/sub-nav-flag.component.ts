import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-sub-nav-flag',
  templateUrl: './sub-nav-flag.component.html',
  styleUrls: ['./sub-nav-flag.component.scss']
})
export class SubNavFlagComponent implements OnInit {

  @Input() tabs: any=[];

  carouselSlideOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: false,
    navSpeed: 1500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 4
      }
    },
    nav: true
  }
  
  constructor() { }

  ngOnInit(): void {
    console.log('tabs : ', this.tabs);    
  }
}
