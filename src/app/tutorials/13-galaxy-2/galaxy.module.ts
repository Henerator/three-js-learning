import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalaxyComponent } from './galaxy.component';

const routes: Routes = [
  {
    path: '',
    component: GalaxyComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [GalaxyComponent],
})
export class Galaxy2Module {}
