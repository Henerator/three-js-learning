import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomGeometryComponent } from './custom-geometry.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CustomGeometryComponent }];

@NgModule({
  declarations: [CustomGeometryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CustomGeometryModule {}
