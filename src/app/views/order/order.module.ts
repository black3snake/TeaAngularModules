import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import {OrderComponent} from "./order.component";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    OrderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    OrderRoutingModule
  ],
  exports: [
    OrderRoutingModule
  ]
})
export class OrderModule { }
