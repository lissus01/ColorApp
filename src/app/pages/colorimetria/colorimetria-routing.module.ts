import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorimetriaPage } from './colorimetria.page';

const routes: Routes = [
  {
    path: '',
    component: ColorimetriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorimetriaPageRoutingModule {}
