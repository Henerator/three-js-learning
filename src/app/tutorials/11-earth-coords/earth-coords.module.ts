import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarthCoordsComponent } from './earth-coords.component';

const routes: Routes = [
  {
    path: '',
    component: EarthCoordsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [EarthCoordsComponent],
})
export class EarthCoordsModule {}
