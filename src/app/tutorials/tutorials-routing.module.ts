import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeelSphereComponent } from './feel-sphere/feel-sphere.component';

const routes: Routes = [
  {
    path: 'feel-sphere',
    component: FeelSphereComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialsRoutingModule {}
