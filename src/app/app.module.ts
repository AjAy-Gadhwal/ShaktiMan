import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatchcardsComponent } from './components/matchcards/matchcards.component';
import { InplaycardsComponent } from './components/inplaycards/inplaycards.component';
import { CasinoComponent } from './components/casino/casino.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RightsidebarComponent } from './components/rightsidebar/rightsidebar.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { RulesComponent } from './components/rules/rules.component';
import { HorsebettingComponent } from './components/horsebetting/horsebetting.component';
import { HorsebettingsecondComponent } from './components/horsebettingsecond/horsebettingsecond.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MatchcardsComponent,
    InplaycardsComponent,
    CasinoComponent,
    HomepageComponent,
    RightsidebarComponent,
    PromotionComponent,
    RulesComponent,
    HorsebettingComponent,
    HorsebettingsecondComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
