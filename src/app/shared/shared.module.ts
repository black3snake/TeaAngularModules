import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {TextLimitPipe} from "./pipes/text-limit.pipe";
import {PopupComponent} from "./popup/popup.component";
import {RouterModule} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    TextLimitPipe,
    PopupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    TextLimitPipe,
    PopupComponent,
  ]
})
export class SharedModule { }
