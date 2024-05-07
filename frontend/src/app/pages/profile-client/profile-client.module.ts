import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileClientPageRoutingModule } from './profile-client-routing.module';

import { ProfileClientPage } from './profile-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileClientPageRoutingModule
  ],
  declarations: [ProfileClientPage]
})
export class ProfileClientPageModule {}
