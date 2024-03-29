import { Component, OnInit } from "@angular/core";
import * as Flickity from "flickity";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  carouselSlideOptions: OwlOptions = {
    center: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 1000,
    navText: ['', ''],
    //margin:-100,
    stagePadding: 43,
    responsive: {
      0: {
        items:1
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

  CardcarouselSlideOptions: OwlOptions = {
    center: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: false,
    navSpeed: 1000,
    navText: ['', ''],
    //margin:0,
    stagePadding: 37,
    responsive: {
      0: {
        items:1
      },
      400: {
        
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  subNavTabs = {
    '/dashboard/today': "Today",
    '/dashboard/tomorrow': "Tomorrow",
    '/dashboard/inplay': "Inplay"
  }

  slides: any = [
    '../../../assets/images/casino.png',
    '../../../assets/images/casino.png',
    '../../../assets/images/casino.png',
    '../../../assets/images/casino.png'
  ];

  activeSlide = 0;
  
  constructor(
  ) {
  }

  ngOnInit(): void {
    const elem = document.querySelector('.carousel');

    if (elem) {
      new Flickity(elem, {  
        autoPlay: false,
        cellAlign: 'center', 
        contain: false,
        groupCells: '20%',
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        selectedAttraction: 0.03,
        friction: 0.15
      });
    }
  }
}
