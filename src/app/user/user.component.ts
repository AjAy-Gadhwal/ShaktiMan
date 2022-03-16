import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LoginModalComponent } from '../@shared/components/login-modal/login-modal.component';
import { SignupModalComponent } from '../@shared/components/signup-modal/signup-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

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

  currentRoute: string = '/';
  menuBar!: HTMLDivElement;
  menuIndicator!: HTMLDivElement;
  menuCurrentItem!: HTMLAnchorElement;

  constructor(
    private router: Router,
    // private modalService: NgbModal
  ) { }

  ngOnInit(): void {   
    
    // const menu_bar = document.querySelector('.sm-bottom-bar') as HTMLDivElement;
    // const menu_item = document.querySelectorAll('.sm-menu-item') as NodeListOf<HTMLDivElement>;
    // const menu_indicator = document.querySelector('.sm-nav-indicator') as HTMLDivElement;
    // const menu_current_item = document.querySelector('.sm-current') as HTMLDivElement;
    // let menu_position;

    // menu_position = menu_current_item.offsetLeft - 16;
    // menu_indicator.style.left = menu_position + "px";
    // menu_bar.style.backgroundPosition = menu_position-8 + 'px';
    // menu_item.forEach(
    //   function(select_menu_item: any){
    //     select_menu_item.addEventListener('click', function(e: any){
    //       e.preventDefault();
    //       menu_position = e.offsetLeft - 16;
    //       menu_indicator.style.left = menu_position + "px";
    //       menu_bar.style.backgroundPosition = menu_position-8 + 'px';
    //       [...select_menu_item.parentElement.children].forEach(
    //         sibling => {
    //           sibling.classList.remove('sc-current');
    //         })
    //       select_menu_item.classList.add('sc-current');
    //     });
    //   }
    // ) 
  }

  ngAfterViewInit(): void {    
    this.menuBar = document.querySelector('.sm-bottom-bar') as HTMLDivElement;
    this.menuIndicator = document.querySelector('.sm-nav-indicator') as HTMLDivElement;

    this.onClickBottomMenu("/");
  }
  
  onClickBottomMenu(url: string): void {
    this.currentRoute = url;
    this.router.navigateByUrl(url);
    
    setTimeout(() => {
      this.menuCurrentItem = document.querySelector('.sm-current') as HTMLAnchorElement;
      
      const menuPosition = this.menuCurrentItem.offsetLeft + (56/4) - 2;
      this.menuIndicator.style.left = menuPosition + "px";
      this.menuBar.style.backgroundPosition = menuPosition-8 + 'px';      
    }, 100);
  }

  // toggleSidebar(event: MouseEvent): void {
  //   event.preventDefault();
  //   document.body.classList.toggle('sm-sidenav-toggled');
  //   localStorage.setItem('sm|sidebar-toggle', document.body.classList.contains('sm-sidenav-toggled').toString());
  // }

  // closeSidebar(event: MouseEvent): void {
  //   event.preventDefault();
  //   document.body.classList.remove('sm-sidenav-toggled');
  //   localStorage.setItem('sm|sidebar-toggle', document.body.classList.contains('sm-sidenav-toggled').toString());
  // }

  // logout(): void {
  // }

  openComponent(route: string): void {
    console.log('route : ', route);    
    this.router.navigateByUrl(route);
  }

  // openLoginModal(): void {
  //   const modalRef = this.modalService.open(LoginModalComponent, { modalDialogClass: 'sm-modal', size: 'lg' });
  // }

  // openSignupModal(): void {
  //   const modalRef = this.modalService.open(SignupModalComponent, { modalDialogClass: 'sm-modal', size: 'lg' });
  // }
}
