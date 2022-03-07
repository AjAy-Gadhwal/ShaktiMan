import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-slip-card',
  templateUrl: './best-slip-card.component.html',
  styleUrls: ['./best-slip-card.component.scss']
})
export class BestSlipCardComponent implements OnInit {

  @Input() type='green';
  constructor() { }

  ngOnInit(): void {
  }

}
