import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showRules(){
    var rulesContainer = document.querySelector('.rule-container');
    //rulesContainer.classList.toggle('show');
  }
}
