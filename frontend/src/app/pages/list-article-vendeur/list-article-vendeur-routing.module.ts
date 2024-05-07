import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListArticleVendeurPage } from './list-article-vendeur.page';

const routes: Routes = [
  {
    path: '',
    component: ListArticleVendeurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListArticleVendeurPageRoutingModule {}
