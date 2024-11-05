import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColoresComplementariosPage } from './colores-complementarios.page';

const routes: Routes = [
  {
    path: '',
    component: ColoresComplementariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColoresComplementariosPageRoutingModule {}
