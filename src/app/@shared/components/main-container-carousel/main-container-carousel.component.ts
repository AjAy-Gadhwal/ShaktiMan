import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-container-carousel',
  templateUrl: './main-container-carousel.component.html',
  styleUrls: ['./main-container-carousel.component.scss']
})
export class MainContainerCarouselComponent implements OnInit {

  @Input() slides: any=[];

  carouselSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 1500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  constructor() { }

  ngOnInit(): void {
  }
}
