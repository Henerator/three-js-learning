import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeelSphereComponent } from './feel-sphere/feel-sphere.component';
import { TutorialsRoutingModule } from './tutorials-routing.module';

@NgModule({
  declarations: [FeelSphereComponent],
  imports: [CommonModule, TutorialsRoutingModule],
})
export class TutorialsModule {}
