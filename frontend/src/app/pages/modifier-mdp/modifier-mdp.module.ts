import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierMdpPageRoutingModule } from './modifier-mdp-routing.module';

import { ModifierMdpPage } from './modifier-mdp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierMdpPageRoutingModule
  ],
  declarations: [ModifierMdpPage]
})
export class ModifierMdpPageModule {}
