import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameOfLifeComponent } from './game-of-life.component';

const routes: Routes = [{ path: '', component: GameOfLifeComponent }];

@NgModule({
  declarations: [GameOfLifeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class GameOfLifeModule {}
