import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluateArticlePage } from './evaluate-article.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluateArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluateArticlePageRoutingModule {}
