import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePhotUserPageRoutingModule } from './update-phot-user-routing.module';

import { UpdatePhotUserPage } from './update-phot-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePhotUserPageRoutingModule
  ],
  declarations: [UpdatePhotUserPage]
})
export class UpdatePhotUserPageModule {}
