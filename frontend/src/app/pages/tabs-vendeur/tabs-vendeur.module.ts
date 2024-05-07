import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsVendeurPageRoutingModule } from './tabs-vendeur-routing.module';

import { TabsVendeurPage } from './tabs-vendeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsVendeurPageRoutingModule
  ],
  declarations: [TabsVendeurPage]
})
export class TabsVendeurPageModule {}
