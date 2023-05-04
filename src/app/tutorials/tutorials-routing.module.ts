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
    path: 'game-of-life',
    loadChildren: () =>
      import('./5-game-of-life/game-of-life.module').then(
        (module) => module.GameOfLifeModule
      ),
  },
  {
    path: 'particles-image',
    loadChildren: () =>
      import('./6-particles-image/particles-image.module').then(
        (module) => module.ParticlesImageModule
      ),
  },
  {
    path: 'globe',
    loadChildren: () =>
      import('./7-globe/globe.module').then((module) => module.GlobeModule),
  },
  {
    path: 'feel-sphere',
    loadChildren: () =>
      import('./8-feel-sphere/feel-sphere.module').then(
        (module) => module.FeelSphereModule
      ),
  },
  {
    path: 'reflective-grid',
    loadChildren: () =>
      import('./9-reflective-grid/reflective-grid.module').then(
        (module) => module.ReflectiveGridModule
      ),
  },
  {
    path: 'waves',
    loadChildren: () =>
      import('./10-waves/waves.module').then((module) => module.WavesModule),
  },
  {
    path: 'earth-coords',
    loadChildren: () =>
      import('./11-earth-coords/earth-coords.module').then(
        (module) => module.EarthCoordsModule
      ),
  },
  {
    path: 'galaxy',
    loadChildren: () =>
      import('./12-galaxy/galaxy.module').then((module) => module.GalaxyModule),
  },
  {
    path: 'galaxy-2',
    loadChildren: () =>
      import('./13-galaxy-2/galaxy.module').then(
        (module) => module.Galaxy2Module
      ),
  },
  {
    path: 'traveling-particles',
    loadChildren: () =>
      import('./14-traveling-particles/template.module').then(
        (module) => module.TravelingParticlesModule
      ),
  },
  {
    path: 'rain-image',
    loadChildren: () =>
      import('./16-rain-image/rain-image.module').then(
        (module) => module.RainImageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialsRoutingModule {}
