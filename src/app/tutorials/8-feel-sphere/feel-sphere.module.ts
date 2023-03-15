import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeelSphereComponent } from './feel-sphere.component';

const routes: Routes = [
  {
    path: '',
    component: FeelSphereComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [FeelSphereComponent],
})
export class FeelSphereModule {}
