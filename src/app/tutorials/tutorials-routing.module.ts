import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeelSphereComponent } from './feel-sphere/feel-sphere.component';
import { FundamentalsComponent } from './fundamentals/fundamentals.component';

const routes: Routes = [
  {
    path: 'fundamentals',
    component: FundamentalsComponent,
  },
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
