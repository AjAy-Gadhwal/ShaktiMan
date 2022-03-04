import { Component, OnInit } from '@angular/core';
import { AuthService } from '../@shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  admin: any = {};

  constructor(
    private authService: AuthService
  ) { 
    this.admin = this.authService.adminData();
  }

  ngOnInit(): void {
    if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      document.body.classList.toggle('sb-sidenav-toggled');
    }
  }

  toggleSidebar(event: MouseEvent): void {
    event.preventDefault();
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled').toString());
  }

  logout(): void {
    this.authService.adminLogout();
  }
}
