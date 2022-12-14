import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SceneGraphComponent } from './scene-graph.component';

const routes: Routes = [{ path: '', component: SceneGraphComponent }];

@NgModule({
  declarations: [SceneGraphComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SceneGraphModule {}
