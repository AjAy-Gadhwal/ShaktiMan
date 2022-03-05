import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  carouselSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: false,
    navSpeed: 1500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 0
      },
      400: {
        items: 0
      },
      740: {
        items: 3
      },
      1200: {
        items: 3
      },
      1201: {
        items: 4
      }
    },
    nav: true
  }

  constructor() { }

  ngOnInit(): void {
    // if (localStorage.getItem('sm|sidebar-toggle') === 'true') {
    //   document.body.classList.toggle('sm-sidenav-toggled');
    // }
  }

  toggleSidebar(event: MouseEvent): void {
    event.preventDefault();
    document.body.classList.toggle('sm-sidenav-toggled');
    localStorage.setItem('sm|sidebar-toggle', document.body.classList.contains('sm-sidenav-toggled').toString());
  }

  closeSidebar(event: MouseEvent): void {
    event.preventDefault();
    document.body.classList.remove('sm-sidenav-toggled');
    localStorage.setItem('sm|sidebar-toggle', document.body.classList.contains('sm-sidenav-toggled').toString());
  }

  logout(): void {
  }
}
