import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RainDropEffectComponent } from './rain-drop-effect.component';

const routes: Routes = [{ path: '', component: RainDropEffectComponent }];

@NgModule({
  declarations: [RainDropEffectComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RainDropEffectModule {}
