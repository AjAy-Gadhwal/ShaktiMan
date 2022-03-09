import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.scss']
})
export class CasinoComponent implements OnInit {

  subNavTabs = {
    '/casino/all': "All",
    '/casino/teen-patti': "Teen Patti",
    '/casino/baccarat': "Baccarat",
    '/casino/poker': "Poker",
    '/casino/andar-bahar': "Andar Bahar",
    '/casino/worli-matka': "Worli Matka",
    '/casino/joker': "Joker"
  }

  slides: any = [
    '../../../assets/images/casino-banner.png',
    '../../../assets/images/casino-banner.png',
    '../../../assets/images/casino-banner.png',
    '../../../assets/images/casino-banner.png'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
