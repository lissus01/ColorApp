import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorimetriaPageRoutingModule } from './colorimetria-routing.module';

import { ColorimetriaPage } from './colorimetria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorimetriaPageRoutingModule
  ],
  declarations: [ColorimetriaPage]
})
export class ColorimetriaPageModule {}
