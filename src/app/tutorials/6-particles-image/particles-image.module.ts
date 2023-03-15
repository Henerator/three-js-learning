import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticlesImageComponent } from './particles-image.component';

const routes: Routes = [
  {
    path: '',
    component: ParticlesImageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ParticlesImageComponent],
})
export class ParticlesImageModule {}
