import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'fundamentals',
    loadChildren: () =>
      import('./1-fundamentals/fundamentals.module').then(
        (module) => module.FundamentalsModule
      ),
  },
  {
    path: 'graph-scene',
    loadChildren: () =>
      import('./2-scene-graph/scene-graph.module').then(
        (module) => module.SceneGraphModule
      ),
  },
  {
    path: 'custom-geometry',
    loadChildren: () =>
      import('./3-custom-geometry/custom-geometry.module').then(
        (module) => module.CustomGeometryModule
      ),
  },
  {
    path: 'rain-drop-effect',
    loadChildren: () =>
      import('./4-rain-drop-effect/rain-drop-effect.module').then(
        (module) => module.RainDropEffectModule
      ),
  },
  {
    path: 'feel-sphere',
    loadChildren: () =>
      import('./feel-sphere/feel-sphere.module').then(
        (module) => module.FeelSphereModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialsRoutingModule {}
