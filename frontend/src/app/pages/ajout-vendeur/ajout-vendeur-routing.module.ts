import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutVendeurPage } from './ajout-vendeur.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutVendeurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutVendeurPageRoutingModule {}
