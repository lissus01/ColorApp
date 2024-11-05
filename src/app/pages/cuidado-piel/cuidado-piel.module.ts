import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuidadoPielPageRoutingModule } from './cuidado-piel-routing.module';

import { CuidadoPielPage } from './cuidado-piel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuidadoPielPageRoutingModule
  ],
  declarations: [CuidadoPielPage]
})
export class CuidadoPielPageModule {}
