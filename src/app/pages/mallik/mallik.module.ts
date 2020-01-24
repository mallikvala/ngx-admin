import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';

import { MallikRoutingModule, routedComponents } from "./mallik-routing.module";



@NgModule({
  imports: [
    MallikRoutingModule,
    NbCardModule,
    CommonModule
  ],
  exports: [],
  declarations: [
    ...routedComponents,
  ],
})
export class MallikModule { }
