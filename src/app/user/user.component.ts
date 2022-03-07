import { Component, OnInit } from '@angular/core';
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
export class UserComponent implements OnInit {

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

  constructor(
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {    
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

  openComponent(route: string): void {
    console.log('route : ', route);    
    this.router.navigateByUrl(route);
  }

  openLoginModal(): void {
    const modalRef = this.modalService.open(LoginModalComponent, { modalDialogClass: 'sm-modal', size: 'lg' });
  }

  openSignupModal(): void {
    const modalRef = this.modalService.open(SignupModalComponent, { modalDialogClass: 'sm-modal', size: 'lg' });
  }
}
