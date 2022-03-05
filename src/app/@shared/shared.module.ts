import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbPaginationModule, NgbTooltipModule, NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgxTrimDirectiveModule } from "ngx-trim-directive";
import { MatchCardsComponent } from "./components/match-cards/match-cards.component";


@NgModule({
  declarations: [    
    MatchCardsComponent
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

    MatchCardsComponent
  ]
})
export class SharedModule { }
