import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WavesComponent } from './waves.component';

const routes: Routes = [
  {
    path: '',
    component: WavesComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [WavesComponent],
})
export class WavesModule {}
