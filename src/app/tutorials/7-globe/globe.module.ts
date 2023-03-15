import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobeComponent } from './globe.component';

const routes: Routes = [
  {
    path: '',
    component: GlobeComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [GlobeComponent],
})
export class GlobeModule {}
