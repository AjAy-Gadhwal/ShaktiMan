import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import * as Flickity from "flickity";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  
  subNavTabs = {
    '/match/all': "All",
    '/match/match-odds': "Match Odds",
    '/match/bookmaker': "Bookmaker",
    '/match/fancy': "Fancy",
    '/match/player': "Player",
    '/match/wicket': "Wicket",
    '/match/bowler-session': "Bowler Session",
  }

  items: any = [];
  slides: any = [
    '../../../assets/images/casino.png',
    '../../../assets/images/casino.png',
    '../../../assets/images/casino.png',
    '../../../assets/images/casino.png'
  ];

  selectIndex: any = null;
  
  constructor(
    private router: Router
  ) {
    this.items = this.randomArray();

    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd)  {
        this.items = this.randomArray();
      }
    });
  }

  ngOnInit(): void {
    const elem = document.querySelector('.carousel');

    if (elem) {
      new Flickity(elem, {  
        autoPlay: false,
        cellAlign: 'center', 
        contain: false,
        groupCells: '20%',
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        selectedAttraction: 0.03,
        friction: 0.15
      });
    }
  }

  randomArray(): any {
    return [false, true, false, true, false, false, true, false, false, true, false, false, true, false];
  }

  deleteCard(i: number=0): void {
    this.items[i] = 'delete';
  }
}
