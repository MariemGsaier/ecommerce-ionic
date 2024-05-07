import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifVendeurPage } from './modif-vendeur.page';

const routes: Routes = [
  {
    path: '',
    component: ModifVendeurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifVendeurPageRoutingModule {}
