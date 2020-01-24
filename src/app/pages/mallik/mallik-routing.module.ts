import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GsComponent } from './gs/gs.component';


const routes: Routes = [{
  path: '',
  component: GsComponent,
  children: [{
    path: 'gs',
    component: GsComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MallikRoutingModule { }

export const routedComponents = [
  GsComponent
];
