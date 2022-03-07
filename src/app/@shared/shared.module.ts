import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbPaginationModule, NgbTooltipModule, NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgxTrimDirectiveModule } from "ngx-trim-directive";
import { BestSlipCardComponent } from "./components/best-slip-card/best-slip-card.component";
import { CricketCardComponent } from "./components/cricket-card/cricket-card.component";
import { MatchCardComponent } from "./components/match-card/match-card.component";
import { ScoreCardComponent } from "./components/score-card/score-card.component";
import { SubNavComponent } from './components/sub-nav/sub-nav.component';


@NgModule({
  declarations: [    
    MatchCardComponent,
    ScoreCardComponent,
    SubNavComponent,
    CricketCardComponent,
    BestSlipCardComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

    
    NgxTrimDirectiveModule,
    
    NgbPaginationModule,
    NgbTooltipModule,
    NgbAccordionModule,

    
    NgSelectModule,

    CarouselModule
  ],
  exports: [
    CommonModule ,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,           

    NgxTrimDirectiveModule,
    
    NgbPaginationModule,
    NgbTooltipModule,
    NgbAccordionModule,

    NgSelectModule,    

    CarouselModule,

    MatchCardComponent,
    ScoreCardComponent,
    SubNavComponent,
    CricketCardComponent,
    BestSlipCardComponent
  ]
})
export class SharedModule { }
