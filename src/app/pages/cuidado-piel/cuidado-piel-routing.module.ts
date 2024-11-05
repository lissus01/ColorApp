import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuidadoPielPage } from './cuidado-piel.page';

const routes: Routes = [
  {
    path: '',
    component: CuidadoPielPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuidadoPielPageRoutingModule {}
