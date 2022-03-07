import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.scss']
})
export class SubNavComponent implements OnInit {

  @Input() tabs: any={};
  @Input() isCondition: boolean=false;

  constructor() { }

  ngOnInit(): void {
    console.log('tabs : ', this.tabs);    
  }
}
