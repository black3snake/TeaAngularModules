import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {MainComponent} from "./main/main.component";
import {RouterModule} from "@angular/router";
import {AnswersComponent} from "./answers/answers.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [
    AnswersComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatExpansionModule,
    RouterModule,
    HomeRoutingModule
  ],
  exports: [
    HomeRoutingModule,
  ]
})
export class HomeModule { }
