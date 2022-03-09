import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  subNavTabs = {
    '/promotion/sports': "Sports",
    '/promotion/casino': "Casino",
    '/promotion/esports': "Esports",
    '/promotion/slots': "Slots",
    '/promotion/fulltoz': "Fulltoz"
  }

  slides: any = [
    '../../../assets/images/casino.png',
    '../../../assets/images/casino.png',
    '../../../assets/images/casino.png',
    '../../../assets/images/casino.png'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  showRules(){
    var rulesContainer = document.querySelector('.rule-container');
    //rulesContainer.classList.toggle('show');
  }
}
