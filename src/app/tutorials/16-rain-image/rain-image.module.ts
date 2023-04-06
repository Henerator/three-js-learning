import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RainImageComponent } from './rain-image.component';

const routes: Routes = [
  {
    path: '',
    component: RainImageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [RainImageComponent],
})
export class RainImageModule {}
