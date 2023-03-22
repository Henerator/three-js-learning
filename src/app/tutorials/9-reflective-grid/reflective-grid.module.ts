import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReflectiveGridComponent } from './reflective-grid.component';

const routes: Routes = [
  {
    path: '',
    component: ReflectiveGridComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ReflectiveGridComponent],
})
export class ReflectiveGridModule {}
