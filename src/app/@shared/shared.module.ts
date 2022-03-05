import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbPaginationModule, NgbTooltipModule, NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgxTrimDirectiveModule } from "ngx-trim-directive";
import { MatchCardComponent } from "./components/match-card/match-card.component";
import { ScoreCardComponent } from "./components/score-card/score-card.component";


@NgModule({
  declarations: [    
    MatchCardComponent,
    ScoreCardComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,

    
    NgxTrimDirectiveModule,
    
    NgbPaginationModule,
    NgbTooltipModule,
    NgbAccordionModule,

    
    NgSelectModule,

    CarouselModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,           

    NgxTrimDirectiveModule,
    
    NgbPaginationModule,
    NgbTooltipModule,
    NgbAccordionModule,

    NgSelectModule,    

    CarouselModule,

    MatchCardComponent,
    ScoreCardComponent
  ]
})
export class SharedModule { }
