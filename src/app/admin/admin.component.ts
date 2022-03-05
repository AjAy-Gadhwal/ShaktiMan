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
    // var menu_bar = document.querySelector(".sc-bottom-bar") as any;
    // var menu_item = document.querySelectorAll(".sc-menu-item") as any;
    // var menu_indicator = document.querySelector(".sc-nav-indicator") as any;
    // var menu_current_item = document.querySelector(".sc-current") as any;
    // var menu_position;

    // if (menu_current_item && menu_indicator) {
    //   menu_position = menu_current_item.offsetLeft - 16;
    //   menu_indicator.style.left = menu_position + "px";
    //   menu_bar.style.backgroundPosition = menu_position - 8 + "px";
    //   menu_item.forEach((select_menu_item: any) => {
    //     select_menu_item.addEventListener("click",  (e: any) => {
    //       e.preventDefault();
    //       menu_position = e.offsetLeft - 16;
    //       menu_indicator.style.left = menu_position + "px";
    //       menu_bar.style.backgroundPosition = menu_position - 8 + "px";
    //       [...select_menu_item.parentElement.children].forEach((sibling) => {
    //         sibling.classList.remove("sc-current");
    //       });
    //       select_menu_item.classList.add("sc-current");
    //     });
    //   });
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
