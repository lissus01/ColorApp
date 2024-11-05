import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColoresComplementariosPageRoutingModule } from './colores-complementarios-routing.module';

import { ColoresComplementariosPage } from './colores-complementarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColoresComplementariosPageRoutingModule
  ],
  declarations: [ColoresComplementariosPage]
})
export class ColoresComplementariosPageModule {}
