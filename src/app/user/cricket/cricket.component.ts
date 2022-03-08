import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import * as Flickity from "flickity";
import { OwlOptions } from "ngx-owl-carousel-o";
import { filter, map } from "rxjs";

@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.scss']
})
export class CricketComponent implements OnInit {

  carouselSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 1500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  subNavTabs = {
    '/cricket/all': "All",
    '/cricket/match-odds': "Match Odds",
    '/cricket/bookmaker': "Bookmaker",
    '/cricket/fancy': "Fancy",
    '/cricket/player': "Player",
    '/cricket/wicket': "Wicket",
    '/cricket/bowler-session': "Bowler Session",
  }

  items: any = [];
  
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
    return Array(10).fill(Math.random() < 0.5).map(() => Math.round(Math.random() * 10));
  }
}
