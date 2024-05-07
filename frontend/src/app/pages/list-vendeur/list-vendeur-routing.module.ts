import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListVendeurPage } from './list-vendeur.page';

const routes: Routes = [
  {
    path: '',
    component: ListVendeurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListVendeurPageRoutingModule {}
