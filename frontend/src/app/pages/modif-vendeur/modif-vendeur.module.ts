import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifVendeurPageRoutingModule } from './modif-vendeur-routing.module';

import { ModifVendeurPage } from './modif-vendeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifVendeurPageRoutingModule
  ],
  declarations: [ModifVendeurPage]
})
export class ModifVendeurPageModule {}
