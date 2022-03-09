import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horse-betting',
  templateUrl: './horse-betting.component.html',
  styleUrls: ['./horse-betting.component.scss']
})
export class HorseBettingComponent implements OnInit {

  subNavFlagTabs = [
    {
      link: '/horse-betting/flag-1',
      flag: '../../../assets/images/1.png',
      title: 'ENG',
      count: '10'
    },
    {
      link: '/horse-betting/flag-2',
      flag: '../../../assets/images/2.png',
      title: 'ENG',
      count: '10'
    },
    {
      link: '/horse-betting/flag-3',
      flag: '../../../assets/images/3.png',
      title: 'ENG',
      count: '10'
    },
    {
      link: '/horse-betting/flag-4',
      flag: '../../../assets/images/4.png',
      title: 'ENG',
      count: '10'
    },
    {
      link: '/horse-betting/flag-5',
      flag: '../../../assets/images/5.png',
      title: 'ENG',
      count: '10'
    },
    {
      link: '/horse-betting/flag-6',
      flag: '../../../assets/images/6.png',
      title: 'ENG',
      count: '10'
    },
    {
      link: '/horse-betting/flag-7',
      flag: '../../../assets/images/7.png',
      title: 'ENG',
      count: '10'
    }
  ]
    

  subNavTabs = {
    '/horse-betting/today': "Today",
    '/horse-betting/tomorrow': "Tomorrow",
    '/horse-betting/saturday': "Saturday"
  }

  slides: any = [
    '../../../assets/images/horse-banner.png',
    '../../../assets/images/horse-banner.png',
    '../../../assets/images/horse-banner.png',
    '../../../assets/images/horse-banner.png'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
