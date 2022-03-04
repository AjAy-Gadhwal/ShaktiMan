import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @Output() sideMenu = new EventEmitter;
  drawer: any;
  showFiller = false;
  panelOpenState = '';

  constructor() { }

  ngOnInit(): void {
  }

  // openNav(){
  //   this.sideMenu.emit("a");
  // }

}
