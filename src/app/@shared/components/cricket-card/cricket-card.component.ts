import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cricket-card',
  templateUrl: './cricket-card.component.html',
  styleUrls: ['./cricket-card.component.scss']
})
export class CricketCardComponent implements OnInit {

  @Input() isLive: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
