import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundamentalsComponent } from './fundamentals.component';

const routes: Routes = [
  {
    path: '',
    component: FundamentalsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [FundamentalsComponent],
})
export class FundamentalsModule {}
