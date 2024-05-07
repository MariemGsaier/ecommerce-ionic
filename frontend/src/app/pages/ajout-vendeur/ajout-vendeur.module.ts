import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutVendeurPageRoutingModule } from './ajout-vendeur-routing.module';

import { AjoutVendeurPage } from './ajout-vendeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutVendeurPageRoutingModule
  ],
  declarations: [AjoutVendeurPage]
})
export class AjoutVendeurPageModule {}
