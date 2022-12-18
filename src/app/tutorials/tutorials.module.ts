import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeelSphereComponent } from './feel-sphere/feel-sphere.component';
import { TutorialsRoutingModule } from './tutorials-routing.module';
import { FundamentalsComponent } from './fundamentals/fundamentals.component';

@NgModule({
  declarations: [FeelSphereComponent, FundamentalsComponent],
  imports: [CommonModule, TutorialsRoutingModule],
})
export class TutorialsModule {}
