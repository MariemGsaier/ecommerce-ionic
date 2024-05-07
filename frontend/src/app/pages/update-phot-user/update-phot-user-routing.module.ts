import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePhotUserPage } from './update-phot-user.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePhotUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePhotUserPageRoutingModule {}
