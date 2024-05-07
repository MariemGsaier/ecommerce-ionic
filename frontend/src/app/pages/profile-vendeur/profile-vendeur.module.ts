import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileVendeurPageRoutingModule } from './profile-vendeur-routing.module';

import { ProfileVendeurPage } from './profile-vendeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileVendeurPageRoutingModule
  ],
  declarations: [ProfileVendeurPage]
})
export class ProfileVendeurPageModule {}
