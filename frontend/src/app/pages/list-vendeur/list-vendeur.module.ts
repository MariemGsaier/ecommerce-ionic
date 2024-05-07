import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListVendeurPageRoutingModule } from './list-vendeur-routing.module';

import { ListVendeurPage } from './list-vendeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListVendeurPageRoutingModule
  ],
  declarations: [ListVendeurPage]
})
export class ListVendeurPageModule {}
