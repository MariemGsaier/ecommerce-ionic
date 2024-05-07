import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileVendeurPage } from './profile-vendeur.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileVendeurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileVendeurPageRoutingModule {}
