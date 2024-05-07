import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifArticlePage } from './modif-article.page';

const routes: Routes = [
  {
    path: '',
    component: ModifArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifArticlePageRoutingModule {}
